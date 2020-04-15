import { ShaderProgram } from "./ShaderProgram";
import { ProgramInfo } from "./ProgramInfo";
import { Buffers } from "./Buffers";
import { Renderer } from "./Renderer";
//to do: separate/refactor into smaller modules- buffer and renderer especially
export class WebglEffect {
  private readonly canvas: HTMLCanvasElement;
  private _ctx: WebGLRenderingContext;
  private _canvasContainer: HTMLElement;
  private _shaderProgramModule: ShaderProgram;
  private _shaderProgram: WebGLShader;
  private _programInfoData;

  constructor() {
    this._canvasContainer = document.querySelector(".glcanvas");
    this.canvas = document.createElement("canvas");
    this.canvas.height = 480;
    this.canvas.width = 640;
    this._ctx = this.canvas.getContext("webgl");
    this._canvasContainer.appendChild(this.canvas);
    // Only continue if WebGL is available and working
    if (this._ctx === null) {
      alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
      );
      return;
    }
    this._ctx.clearColor(0.0, 0.0, 0.0, 1.0);
    this._ctx.clear(this._ctx.COLOR_BUFFER_BIT);
    this._shaderProgramModule = new ShaderProgram(this._ctx);
    this._shaderProgram = this._shaderProgramModule.initShaderProgram();
    this.getProgramInfo();
    // const buffers = this.initBuffers(this._ctx);
    const buffers = new Buffers(this._ctx);
    // this.drawScene(this._ctx, this._programInfoData, buffers);
    this.drawScene(this._ctx, this._programInfoData, buffers);
  }
  private getProgramInfo() {
    const programInfo = new ProgramInfo(this._shaderProgram, this._ctx);
    this._programInfoData = programInfo.getProgramInfo;
  }

  //to do: figure out types of programinfo + buffers
  private drawScene(gl: WebGLRenderingContext, programInfo, buffers) {
    let renderer = new Renderer(gl, programInfo, buffers);
  }
}
