import { WebGLInfo, WebGLRenderer, WebGLRenderTarget } from 'three'
import { MaskPass,ClearMaskPass } from "three/examples/jsm/postprocessing/MaskPass.js"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'

export class CustomComposer extends EffectComposer {
    private info: WebGLInfo["render"][] = []

    constructor( renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget ) {
        super(renderer,renderTarget)
	}

    getInfo() : WebGLInfo["render"]{
		let result : WebGLInfo["render"] = { calls : 0,lines : 0, triangles : 0, points : 0, frame: 0}

		for (var info of this.info) {
			result.calls += info.calls;
			result.lines += info.lines;
			result.triangles += info.triangles;
			result.points += info.points;
	   	}
        return result;
    }

    render( deltaTime?: number ): void {
        if ( deltaTime === undefined ) {
			deltaTime = this.clock.getDelta()
		}

		let currentRenderTarget = this.renderer.getRenderTarget()
		let maskActive : boolean = false
        let pass;

		for (let i = 0; i < this.passes.length; i ++ ) {
			pass = this.passes[ i ]

            if ( pass.enabled === false ) 
                continue

            pass.renderToScreen = ( this.renderToScreen && this.isLastEnabledPass( i ) ) // nosonar
            this.info[i] = {...this.renderer.info.render}
			pass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive )

			if ( pass.needsSwap ) {
				if ( maskActive ) {
					var context = this.renderer.getContext()
					var stencil = this.renderer.state.buffers.stencil
                    
					stencil.setFunc( context.NOTEQUAL, 1, 0xffffffff )
					this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime, false)
					stencil.setFunc( context.EQUAL, 1, 0xffffffff )
				}
				this.swapBuffers()
			}

			if ( MaskPass !== undefined ) {
				if ( pass instanceof MaskPass ) {
					maskActive = true
				} else if ( pass instanceof ClearMaskPass ) {
					maskActive = false
				}
			}
		}
		this.renderer.setRenderTarget( currentRenderTarget )
    }
}