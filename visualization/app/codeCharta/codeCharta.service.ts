import { FileValidator } from "./util/fileValidator"
import { CCFile } from "./codeCharta.model"
import { NameDataPair } from "./util/urlUtils"
import { SettingsService } from "./state/settings.service"
import { IRootScopeService } from "angular"
import { FileStateService } from "./state/fileState.service";

export class CodeChartaService {

	// TODO: use ROOT_NAME and ROOT_PATH everywhere in project
	public static ROOT_NAME = "root"
	public static ROOT_PATH =  "/" + CodeChartaService.ROOT_NAME

	//private importedScenarios: Scenario[]
	//private urlData: UrlData

	constructor(
		private $rootScope: IRootScopeService,
		private settingsService: SettingsService,
		//private urlService: UrlUtils,
		private fileStateService: FileStateService
	) {
	}

	public resetMaps(): any {
		throw new Error("Method not implemented.")
	}

	public loadFiles(nameDataPairs: NameDataPair[]): Promise<void> {
		return new Promise((resolve, reject) => {

			this.settingsService.updateSettings(this.settingsService.getDefaultSettings())

			nameDataPairs.forEach((nameDataPair) => {
				const errors = FileValidator.validate(nameDataPair.data as any)
				if (errors.length === 0) {
					const ccFile = this.getCCFile(nameDataPair.name, nameDataPair.data)
					this.fileStateService.addFile(ccFile)
				} else {
					reject(errors)
				}
			})

			// TODO #136
			/*
			if(applyScenarioOnce) {
			    this.scenarioService.applyScenarioOnce(this.scenarioService.getDefaultScenario());
			} else {
			    this.scenarioService.applyScenario(this.scenarioService.getDefaultScenario());
			}
			*/

			this.fileStateService.setSingle(this.fileStateService.getCCFiles()[0])

			// TODO this.settingsService.updateSettingsFromUrl();
			resolve()
		})
	}


	private getCCFile(fileName: string, fileContent: any): CCFile {
		return {
			fileMeta: {
				fileName: fileName,
				projectName: fileContent.projectName,
				apiVersion: fileContent.apiVersion
			},
			settings: {
				fileSettings: {
					edges: fileContent.edges || [],
					attributeTypes: fileContent.attributeTypes || {},
					blacklist: fileContent.blacklist || [],
				}
			},
			map: fileContent.nodes[0]
		}
	}
}
