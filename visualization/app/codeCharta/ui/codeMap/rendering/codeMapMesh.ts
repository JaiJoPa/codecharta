import { CodeMapShaderStrings } from "./codeMapShaderStrings"
import { BuildResult, GeometryGenerator } from "./geometryGenerator"
import { CodeMapGeometricDescription, IntersectionResult } from "./codeMapGeometricDescription"
import { CodeMapBuilding } from "./codeMapBuilding"
import { Node, Settings } from "../../../codeCharta.model"
import { Camera, Mesh, Ray, ShaderMaterial, UniformsLib, UniformsUtils, Vector3 } from "three"
import { ColorConverter } from "../../../util/color/colorConverter"

interface ThreeUniform {
	type: string
	value: any
}

interface CodeMapLightingParams {
	deltaColorPositive: ThreeUniform
	deltaColorNegative: ThreeUniform
}

export interface MousePos {
	x: number
	y: number
}

export class CodeMapMesh {
	public static readonly NUM_OF_COLOR_VECTOR_FIELDS = 3
	public static readonly NUM_OF_VERTICES = 24

	public settings: Settings
	private threeMesh: Mesh
	private material: ShaderMaterial
	private geomGen: GeometryGenerator
	private mapGeomDesc: CodeMapGeometricDescription

	private nodes: Node[]

	private lightingParams: CodeMapLightingParams = null

	constructor(nodes: Node[], settings: Settings, isDeltaState: boolean) {
		this.nodes = nodes
		this.initLightingParams(settings)
		this.initMaterial(settings)

		this.geomGen = new GeometryGenerator()
		const buildRes: BuildResult = this.geomGen.build(this.nodes, this.material, settings, isDeltaState)

		this.threeMesh = buildRes.mesh
		this.mapGeomDesc = buildRes.desc
		this.settings = settings

		this.initDeltaColorsOnMesh(settings)
	}

	private initDeltaColorsOnMesh(settings: Settings) {
		if (this.mapGeomDesc.buildings[0].node.deltas) {
			this.mapGeomDesc.buildings.forEach(building => {
				this.setNewDeltaColor(building, settings)
				this.setVertexColor(building.id, building.getColorVector(), building.getDeltaColorVector())
			})
			this.updateVertices()
		}
	}

	public getThreeMesh(): Mesh {
		return this.threeMesh
	}

	public selectBuilding(building: CodeMapBuilding, selected: CodeMapBuilding, color: string) {
		building.setColor(color)
		this.setVertexColor(building.id, building.getColorVector(), building.getDefaultDeltaColorVector())
		this.updateVertices()
	}

	public clearSelection(selected: CodeMapBuilding) {
		selected.resetColor()
		this.setVertexColor(selected.id, selected.getDefaultColorVector(), selected.getDefaultDeltaColorVector())
		this.updateVertices()
	}

	public getMeshDescription(): CodeMapGeometricDescription {
		return this.mapGeomDesc
	}

	public checkMouseRayMeshIntersection(mouse: MousePos, camera: Camera): IntersectionResult {
		const ray: Ray = this.calculatePickingRay(mouse, camera)
		return this.getMeshDescription().intersect(ray)
	}

	public setScale(scale: Vector3) {
		this.mapGeomDesc.setScales(scale)
	}

	public highlightBuilding(highlighted: CodeMapBuilding, selected: CodeMapBuilding, settings: Settings) {
		const mapSize = settings.treeMapSettings.mapSize

		for (let i = 0; i < this.mapGeomDesc.buildings.length; i++) {
			const currentBuilding: CodeMapBuilding = this.mapGeomDesc.buildings[i]
			this.setNewDeltaColor(currentBuilding, settings)
			const distance = highlighted.getCenterPoint(mapSize).distanceTo(currentBuilding.getCenterPoint(mapSize))

			if (!this.isBuildingSelected(selected, currentBuilding)) {
				if (!currentBuilding.equals(highlighted)) {
					if (settings.appSettings.isPresentationMode) {
						this.decreaseLightnessByDistance(currentBuilding, distance)
					} else {
						currentBuilding.decreaseLightness(20)
					}
				} else {
					currentBuilding.decreaseLightness(-10)
				}
			}
			this.setVertexColor(currentBuilding.id, currentBuilding.getColorVector(), currentBuilding.getDeltaColorVector())
		}
		this.updateVertices()
	}

	public clearHighlight(selected: CodeMapBuilding) {
		for (let i = 0; i < this.mapGeomDesc.buildings.length; i++) {
			const currentBuilding: CodeMapBuilding = this.mapGeomDesc.buildings[i]
			if (!this.isBuildingSelected(selected, currentBuilding)) {
				this.setVertexColor(
					currentBuilding.id,
					currentBuilding.getDefaultColorVector(),
					currentBuilding.getDefaultDeltaColorVector()
				)
			}
		}
		this.updateVertices()
	}

	private setNewDeltaColor(building: CodeMapBuilding, settings: Settings) {
		if (building.node.deltas) {
			const deltaValue = building.node.deltas[settings.dynamicSettings.heightMetric]

			if (deltaValue > 0) {
				building.setDeltaColor(settings.appSettings.mapColors.positiveDelta)
			}

			if (deltaValue < 0) {
				building.setDeltaColor(settings.appSettings.mapColors.negativeDelta)
			}
		}
	}

	private isBuildingSelected(selected: CodeMapBuilding, building: CodeMapBuilding) {
		return selected && building.equals(selected)
	}

	private decreaseLightnessByDistance(building: CodeMapBuilding, distance: number) {
		if (distance > 800) {
			building.decreaseLightness(40)
		} else if (distance > 400) {
			building.decreaseLightness(30)
		} else if (distance > 250) {
			building.decreaseLightness(20)
		} else if (distance > 100) {
			building.decreaseLightness(15)
		} else if (distance > 50) {
			building.decreaseLightness(10)
		}
	}

	private setVertexColor(id: number, newColorVector: Vector3, newDeltaColorVector) {
		const numberOfColorFieldsPerBuilding = CodeMapMesh.NUM_OF_COLOR_VECTOR_FIELDS * CodeMapMesh.NUM_OF_VERTICES
		const positionOfFirstColorEntry = id * numberOfColorFieldsPerBuilding
		for (
			let j = positionOfFirstColorEntry;
			j < positionOfFirstColorEntry + numberOfColorFieldsPerBuilding;
			j += CodeMapMesh.NUM_OF_COLOR_VECTOR_FIELDS
		) {
			this.threeMesh.geometry["attributes"].color.array[j] = newColorVector.x
			this.threeMesh.geometry["attributes"].color.array[j + 1] = newColorVector.y
			this.threeMesh.geometry["attributes"].color.array[j + 2] = newColorVector.z

			this.threeMesh.geometry["attributes"].deltaColor.array[j] = newDeltaColorVector.x
			this.threeMesh.geometry["attributes"].deltaColor.array[j + 1] = newDeltaColorVector.y
			this.threeMesh.geometry["attributes"].deltaColor.array[j + 2] = newDeltaColorVector.z
		}
	}

	private updateVertices() {
		this.threeMesh.geometry["attributes"].color.needsUpdate = true
		this.threeMesh.geometry["attributes"].deltaColor.needsUpdate = true
	}

	private initLightingParams(settings: Settings) {
		this.lightingParams = {
			deltaColorPositive: {
				type: "v3",
				value: ColorConverter.colorToVector3(settings.appSettings.mapColors.positiveDelta)
			},
			deltaColorNegative: {
				type: "v3",
				value: ColorConverter.colorToVector3(settings.appSettings.mapColors.negativeDelta)
			}
		}
	}

	private initMaterial(settings: Settings): void {
		if (settings.appSettings.invertDeltaColors) {
			this.setInvertedDeltaColors(settings)
		} else {
			this.setDefaultDeltaColors(settings)
		}

		const uniforms = UniformsUtils.merge([UniformsLib["lights"], this.lightingParams])

		const shaderCode: CodeMapShaderStrings = new CodeMapShaderStrings()

		this.material = new ShaderMaterial({
			vertexShader: shaderCode.vertexShaderCode,
			fragmentShader: shaderCode.fragmentShaderCode,
			lights: true,
			uniforms: uniforms
		})
	}

	private setInvertedDeltaColors(settings: Settings) {
		this.lightingParams.deltaColorPositive = {
			type: "v3",
			value: ColorConverter.colorToVector3(settings.appSettings.mapColors.negativeDelta)
		}
		this.lightingParams.deltaColorNegative = {
			type: "v3",
			value: ColorConverter.colorToVector3(settings.appSettings.mapColors.positiveDelta)
		}
	}

	private setDefaultDeltaColors(settings: Settings) {
		this.lightingParams.deltaColorPositive = {
			type: "v3",
			value: ColorConverter.colorToVector3(settings.appSettings.mapColors.positiveDelta)
		}
		this.lightingParams.deltaColorNegative = {
			type: "v3",
			value: ColorConverter.colorToVector3(settings.appSettings.mapColors.negativeDelta)
		}
	}

	private calculatePickingRay(mouse: MousePos, camera: Camera): Ray {
		const ray: Ray = new Ray()
		ray.origin.setFromMatrixPosition(camera.matrixWorld)
		ray.direction
			.set(mouse.x, mouse.y, 0.5)
			.unproject(camera)
			.sub(ray.origin)
			.normalize()

		return ray
	}
}
