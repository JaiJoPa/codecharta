import { StoreService, StoreSubscriber } from "../../../store.service"
import { IRootScopeService } from "angular"
import { AttributeTypesActions, setAttributeTypes } from "./attributeTypes.actions"
import { getMergedAttributeTypes } from "./attributeTypes.merger"
import { FilesService, FilesSelectionSubscriber } from "../../files/files.service"
import { AttributeTypes } from "../../../../codeCharta.model"
import { isActionOfType } from "../../../../util/reduxHelper"
import { getVisibleFileStates } from "../../../../model/files/files.helper"
import { FileState } from "../../../../model/files/files"

export interface AttributeTypesSubscriber {
	onAttributeTypesChanged(attributeTypes: AttributeTypes)
}

export class AttributeTypesService implements StoreSubscriber, FilesSelectionSubscriber {
	private static ATTRIBUTE_TYPES_CHANGED_EVENT = "attribute-types-changed"

	constructor(private $rootScope: IRootScopeService, private storeService: StoreService) {
		StoreService.subscribe(this.$rootScope, this)
		FilesService.subscribe(this.$rootScope, this)
	}

	onStoreChanged(actionType: string) {
		if (isActionOfType(actionType, AttributeTypesActions)) {
			this.notify(this.select())
		}
	}

	onFilesSelectionChanged(files: FileState[]) {
		this.merge(files)
	}

	private merge(files: FileState[]) {
		const allAttributeTypes = getVisibleFileStates(files).map(({ file }) => file.settings.fileSettings.attributeTypes)

		const mergedAttributeTypes = getMergedAttributeTypes(allAttributeTypes)
		this.storeService.dispatch(setAttributeTypes(mergedAttributeTypes))
	}

	private select() {
		return this.storeService.getState().fileSettings.attributeTypes
	}

	private notify(newState: AttributeTypes) {
		this.$rootScope.$broadcast(AttributeTypesService.ATTRIBUTE_TYPES_CHANGED_EVENT, { attributeTypes: newState })
	}

	static subscribe($rootScope: IRootScopeService, subscriber: AttributeTypesSubscriber) {
		$rootScope.$on(AttributeTypesService.ATTRIBUTE_TYPES_CHANGED_EVENT, (_event_, data) => {
			subscriber.onAttributeTypesChanged(data.attributeTypes)
		})
	}
}
