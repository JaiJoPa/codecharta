import { NodeMetricDataAction, NodeMetricDataActions, setNodeMetricData } from "./nodeMetricData.actions"
import { BlacklistItem, BlacklistType, CodeMapNode, NodeMetricData } from "../../../../codeCharta.model"
import { getVisibleFileStates } from "../../../../model/files/files.helper"
import { FileState } from "../../../../model/files/files"
import { CodeMapHelper } from "../../../../util/codeMapHelper"
import { hierarchy, HierarchyNode } from "d3"
import { sortByMetricName } from "../metricData.reducer"
import { ERROR_MESSAGES } from "../../../../util/fileValidator"

export function nodeMetricData(state = setNodeMetricData().payload, action: NodeMetricDataAction) {
	switch (action.type) {
		case NodeMetricDataActions.SET_NODE_METRIC_DATA:
			return action.payload
		case NodeMetricDataActions.CALCULATE_NEW_NODE_METRIC_DATA:
			return setNewMetricData(action.payload.fileStates, action.payload.blacklist)
		default:
			return state
	}
}

function setNewMetricData(fileStates: FileState[], blacklist: BlacklistItem[]) {
	const hashMap: Map<string, number> = new Map()

	getVisibleFileStates(fileStates).forEach((fileState: FileState) => {
		const nodes = hierarchy(fileState.file.map).leaves()
		nodes.forEach((node: HierarchyNode<CodeMapNode>) => {
			if (node.data.path && !CodeMapHelper.isPathBlacklisted(node.data.path, blacklist, BlacklistType.exclude)) {
				addMaxMetricValuesToHashMap(node, hashMap)
			}
		})

		if (hashMap.size === 0) {
			throw new Error(ERROR_MESSAGES.metricDataUnavailable)
		}
	})
	return getMetricDataFromHashMap(hashMap)
}

function addMaxMetricValuesToHashMap(node: HierarchyNode<CodeMapNode>, hashMap: Map<string, number>) {
	const attributes = Object.keys(node.data.attributes)
	attributes.forEach((metric: string) => {
		const maxValue = hashMap.get(metric)

		if (maxValue === undefined || maxValue <= node.data.attributes[metric]) {
			hashMap.set(metric, node.data.attributes[metric])
		}
	})
}

function getMetricDataFromHashMap(hashMap: Map<string, number>) {
	const metricData: NodeMetricData[] = []

	hashMap.forEach((value: number, key: string) => {
		metricData.push({
			name: key,
			maxValue: value
		})
	})
	sortByMetricName(metricData)
	return metricData
}
