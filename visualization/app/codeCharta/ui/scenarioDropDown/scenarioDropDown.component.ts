"use strict"

import "./scenarioDropDown.component.scss"
import { ScenarioHelper } from "../../util/scenarioHelper"
import { MetricService, MetricServiceSubscriber } from "../../state/metric.service"
import { ColorRange, MetricData } from "../../codeCharta.model"
import { IRootScopeService } from "angular"
import { StoreService } from "../../state/store.service"
import { setState } from "../../state/store/state.actions"
import { DialogService } from "../dialog/dialog.service"
import { setColorRange } from "../../state/store/dynamicSettings/colorRange/colorRange.actions"
import { ThreeOrbitControlsService } from "../codeMap/threeViewer/threeOrbitControlsService"

export interface ScenarioItem {
	scenarioName: string
	isScenarioAppliable: boolean
	icons: { faIconClass: string; isSaved: boolean }[]
}

export class ScenarioDropDownController implements MetricServiceSubscriber {
	private _viewModel: {
		dropDownScenarioItems: ScenarioItem[]
		isScenarioChanged: boolean
	} = {
		dropDownScenarioItems: [],
		isScenarioChanged: true //TODO: When Method implemented to detect that codemap has changed set it to false at first
	}

	private availableMetrics: MetricData[]

	constructor(
		private $rootScope: IRootScopeService,
		private storeService: StoreService,
		private dialogService: DialogService,
		private threeOrbitControlsService: ThreeOrbitControlsService
	) {
		MetricService.subscribe(this.$rootScope, this)
	}

	public loadScenarios() {
		this._viewModel.dropDownScenarioItems = ScenarioHelper.getScenarioItems(this.availableMetrics)
	}

	public onMetricDataAdded(metricData: MetricData[]) {
		this.availableMetrics = metricData
		this.loadScenarios()
	}

	public getButtonColor() {
		return this._viewModel.isScenarioChanged ? "black" : "gray"
	}

	public applyScenario(scenarioName: string) {
		const scenerySettings = ScenarioHelper.getScenarioSettingsByNames(scenarioName)

		this.storeService.dispatch(setState(scenerySettings))
		this.storeService.dispatch(setColorRange(scenerySettings.dynamicSettings.colorRange as ColorRange))
		this.threeOrbitControlsService.setControlTarget()
	}

	public showAddScenarioSettings() {
		this.dialogService.showAddScenarioSettings()
	}

	public removeScenario(scenarioName) {
		if (scenarioName !== "Complexity") {
			ScenarioHelper.deleteScenario(scenarioName)
			this.dialogService.showErrorDialog(scenarioName + " deleted.", "Info")
		} else {
			this.dialogService.showErrorDialog(scenarioName + " cannot be deleted as it is the default Scenario.", "Error")
		}
	}
}

export const scenarioDropDownComponent = {
	selector: "scenarioDropDownComponent",
	template: require("./scenarioDropDown.component.html"),
	controller: ScenarioDropDownController
}
