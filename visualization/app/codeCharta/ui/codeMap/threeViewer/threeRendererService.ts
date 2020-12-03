import { WebGLRenderer } from "three"
import { IRootScopeService } from "angular"
import { StoreService } from "../../../state/store.service"
import {
	IsWhiteBackgroundService,
	IsWhiteBackgroundSubscriber
} from "../../../state/store/appSettings/isWhiteBackground/isWhiteBackground.service"
import { CustomComposer } from "./postprocessing/customComposer";

export class ThreeRendererService implements IsWhiteBackgroundSubscriber {
	static BACKGROUND_COLOR = {
		white: 0xffffff,
		normal: 0xeeeedd
	}

	static CLEAR_COLOR = ThreeRendererService.BACKGROUND_COLOR.normal

	static CLEAR_ALPHA = 1

	static RENDER_OPTIONS = {
		antialias: false,			// deactivated for map, pixel ratio improves quality better, 
									// performance hit is huge especially on fill rate limited gpus 
									// better to use fxaa and composing
		preserveDrawingBuffer: true
	}

	composer: CustomComposer
	renderer: WebGLRenderer

	constructor(private storeService: StoreService, private $rootScope: IRootScopeService) {}

	init(containerWidth: number, containerHeight: number) {
		this.renderer = new WebGLRenderer(ThreeRendererService.RENDER_OPTIONS)
		this.composer = new CustomComposer( this.renderer );
		IsWhiteBackgroundService.subscribe(this.$rootScope, this)
		this.renderer.setSize(containerWidth, containerHeight)
		this.onIsWhiteBackgroundChanged(this.storeService.getState().appSettings.isWhiteBackground)
	}

	onIsWhiteBackgroundChanged(isWhiteBackground: boolean) {
		if (isWhiteBackground) {
			ThreeRendererService.CLEAR_COLOR = ThreeRendererService.BACKGROUND_COLOR.white
		} else {
			ThreeRendererService.CLEAR_COLOR = ThreeRendererService.BACKGROUND_COLOR.normal
		}
		this.renderer.setClearColor(ThreeRendererService.CLEAR_COLOR, ThreeRendererService.CLEAR_ALPHA)
	}
}
