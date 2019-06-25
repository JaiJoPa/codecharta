import "./metricType.component.scss"
import { MetricService } from "../../state/metric.service"
import { AttributeTypeValue, RecursivePartial, Settings } from "../../codeCharta.model"
import { IRootScopeService } from "angular"
import { SettingsService, SettingsServiceSubscriber } from "../../state/settings.service"
import {
	CodeMapBuildingTransition,
	CodeMapMouseEventService,
	CodeMapMouseEventServiceSubscriber
} from "../codeMap/codeMap.mouseEvent.service"
import { CodeMapBuilding } from "../codeMap/rendering/codeMapBuilding"

export class MetricTypeController implements SettingsServiceSubscriber, CodeMapMouseEventServiceSubscriber {
	private _viewModel: {
		areaMetricType: AttributeTypeValue
		heightMetricType: AttributeTypeValue
		colorMetricType: AttributeTypeValue
		isBuildingHovered: boolean
	} = {
		areaMetricType: null,
		heightMetricType: null,
		colorMetricType: null,
		isBuildingHovered: false
	}

	/* @ngInject */
	constructor(private $rootScope: IRootScopeService, private metricService: MetricService) {
		SettingsService.subscribe(this.$rootScope, this)
		CodeMapMouseEventService.subscribe(this.$rootScope, this)
	}

	public onSettingsChanged(settings: Settings, update: RecursivePartial<Settings>, event: angular.IAngularEvent) {
		if (update.dynamicSettings) {
			if (update.dynamicSettings.areaMetric) {
				this._viewModel.areaMetricType = this.metricService.getAttributeTypeByMetric(update.dynamicSettings.areaMetric, settings)
			}
			if (update.dynamicSettings.heightMetric) {
				this._viewModel.heightMetricType = this.metricService.getAttributeTypeByMetric(
					update.dynamicSettings.heightMetric,
					settings
				)
			}
			if (update.dynamicSettings.colorMetric) {
				this._viewModel.colorMetricType = this.metricService.getAttributeTypeByMetric(update.dynamicSettings.colorMetric, settings)
			}
		}
	}

	public onBuildingHovered(data: CodeMapBuildingTransition, event: angular.IAngularEvent) {
		if (data.from) {
			this._viewModel.isBuildingHovered = false
		}
		if (data.to && data.to.node && !data.to.node.isLeaf) {
			this._viewModel.isBuildingHovered = true
		}
	}

	public onBuildingRightClicked(building: CodeMapBuilding, x: number, y: number, event: angular.IAngularEvent) {}

	public onBuildingSelected(data: CodeMapBuildingTransition, event: angular.IAngularEvent) {}

	public isAreaMetricAbsolute(): boolean {
		return this._viewModel.areaMetricType === AttributeTypeValue.absolute || !this._viewModel.areaMetricType
	}

	public isHeightMetricAbsolute(): boolean {
		return this._viewModel.heightMetricType === AttributeTypeValue.absolute || !this._viewModel.heightMetricType
	}

	public isColorMetricAbsolute(): boolean {
		return this._viewModel.colorMetricType === AttributeTypeValue.absolute || !this._viewModel.colorMetricType
	}
}

export const areaMetricTypeComponent = {
	selector: "areaMetricTypeComponent",
	template: require("./areaMetricType.component.html"),
	controller: MetricTypeController
}

export const heightMetricTypeComponent = {
	selector: "heightMetricTypeComponent",
	template: require("./heightMetricType.component.html"),
	controller: MetricTypeController
}

export const colorMetricTypeComponent = {
	selector: "colorMetricTypeComponent",
	template: require("./colorMetricType.component.html"),
	controller: MetricTypeController
}