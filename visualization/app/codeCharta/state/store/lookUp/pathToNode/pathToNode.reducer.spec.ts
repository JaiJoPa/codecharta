import { pathToNode } from "./pathToNode.reducer"
import { PathToNodeAction, setPathToNode } from "./pathToNode.actions"
import { CodeMapNode } from "../../../../codeCharta.model"
import { TEST_DELTA_MAP_A } from "../../../../util/dataMocks"

describe("pathToNode", () => {
	describe("Default State", () => {
		it("should initialize the default state", () => {
			const result = pathToNode(undefined, {} as PathToNodeAction)

			expect(result).toEqual(new Map())
		})
	})

	describe("Action: SET_PATH_TO_NODE", () => {
		it("should set new pathToNode", () => {
			const map = new Map<string, CodeMapNode>()
			map.set(TEST_DELTA_MAP_A.map.path, TEST_DELTA_MAP_A.map)

			const result = pathToNode(new Map(), setPathToNode(map))

			expect(result).toEqual(map)
		})

		it("should set default pathToNode", () => {
			const map = new Map<string, CodeMapNode>()
			map.set(TEST_DELTA_MAP_A.map.path, TEST_DELTA_MAP_A.map)

			const result = pathToNode(map, setPathToNode())

			expect(result).toEqual(new Map())
		})
	})
})
