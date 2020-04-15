export class ProgramInfo {
  private _shaderProgram;
  private _ctx: WebGLRenderingContext;

  constructor(shaderprogram, gl) {
    this._shaderProgram = shaderprogram;
    this._ctx = gl;
  }

  public get getProgramInfo() {
    const programInfo = {
      program: this._shaderProgram,
      attribLocations: {
        vertexPosition: this._ctx.getAttribLocation(
          this._shaderProgram,
          "aVertexPosition"
        ),
        vertexColor: this._ctx.getAttribLocation(
          this._shaderProgram,
          "aVertexColor"
        ),
      },
      uniformLocations: {
        projectionMatrix: this._ctx.getUniformLocation(
          this._shaderProgram,
          "uProjectionMatrix"
        ),
        modelViewMatrix: this._ctx.getUniformLocation(
          this._shaderProgram,
          "uModelViewMatrix"
        ),
      },
    };
    return programInfo;
  }
}
