import { Vector3 } from "three"
import { CodeMapNode, Node, State } from "../../../codeCharta.model"
import { getMarkingColor, isLeaf } from "../../codeMapHelper"
import { getBuildingColor, getIncomingEdgePoint, isNodeFlat, isVisible, TreeMapHelper } from "../treeMapLayout/treeMapHelper"
import { LayoutNode } from "./streetLayoutGenerator"

function calculateSize(node: CodeMapNode, metricName: string) { // TODO if it is same as countNodes in treeMapHelper.ts
	let totalSize = node.attributes[metricName] || 0

	if (totalSize === 0 && node.children && node.children.length > 0) {
		for (const child of node.children) {
			totalSize += calculateSize(child, metricName)
		}
	}
	return totalSize
}

function mergeDirectories(node: CodeMapNode, metricName: string): CodeMapNode {
	let mergedNode = node
	for (const child of node.children) {
		if (!isLeaf(child)) {
			const nodeSize = calculateSize(node, metricName)
			const childSize = calculateSize(child, metricName)
			if (nodeSize === childSize) {
				const nodeName = mergedNode.name
				mergedNode = child
				mergedNode.name = nodeName + "/" + child.name
				break
			}
		}
	}
	return mergedNode
}

function getHeightValue(s: State, squaredNode: LayoutNode, maxHeight: number, flattened: boolean): number {
	let heightValue = squaredNode.data.attributes[s.dynamicSettings.heightMetric] || TreeMapHelper.HEIGHT_VALUE_WHEN_METRIC_NOT_FOUND

	if (flattened) {
		return TreeMapHelper.MIN_BUILDING_HEIGHT
	} else if (s.appSettings.invertHeight) {
		return maxHeight - heightValue
	} else {
		return heightValue
	}
}

function buildNodeFrom(layoutNode: LayoutNode, heightScale: number, maxHeight: number, s: State, isDeltaState: boolean): Node {
	const isNodeLeaf: boolean = !(layoutNode.data.children && layoutNode.data.children.length > 0)
	const flattened: boolean = isNodeFlat(layoutNode.data, s)
	const heightValue: number = getHeightValue(s, layoutNode, maxHeight, flattened)
	const height = Math.abs(
		isNodeLeaf ? Math.max(heightScale * heightValue, TreeMapHelper.MIN_BUILDING_HEIGHT) : TreeMapHelper.FOLDER_HEIGHT
	)

	const length = layoutNode.rect.height
	const x0 = layoutNode.rect.topLeft.x
	const y0 = layoutNode.rect.topLeft.y
	const z0 = layoutNode.zOffset * TreeMapHelper.FOLDER_HEIGHT

	return {
		name: layoutNode.data.name,
		id: layoutNode.data.id,
		width: layoutNode.rect.width,
		height,
		length,
		depth: layoutNode.zOffset,
		mapNodeDepth : 100,
		x0,
		z0,
		y0,
		isLeaf: isNodeLeaf,
		attributes: layoutNode.data.attributes,
		edgeAttributes: layoutNode.data.edgeAttributes,
		deltas: layoutNode.data.deltas,
		heightDelta:
			layoutNode.data.deltas && layoutNode.data.deltas[s.dynamicSettings.heightMetric]
				? heightScale * layoutNode.data.deltas[s.dynamicSettings.heightMetric]
				: 0,
		visible: isVisible(layoutNode.data, isNodeLeaf, s, flattened),
		path: layoutNode.data.path,
		link: layoutNode.data.link,
		markingColor: getMarkingColor(layoutNode.data, s.fileSettings.markedPackages),
		flat: flattened,
		color: getBuildingColor(layoutNode.data, s, isDeltaState, flattened),
		incomingEdgePoint: getIncomingEdgePoint(layoutNode.rect.width, height, length, new Vector3(x0, z0, y0), s.treeMap.mapSize),
		outgoingEdgePoint: getIncomingEdgePoint(layoutNode.rect.width, height, length, new Vector3(x0, z0, y0), s.treeMap.mapSize)
	}
}

export const StreetViewHelper = {
	calculateSize,
	mergeDirectories,
	buildNodeFrom
}