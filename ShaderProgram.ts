export class ShaderProgram {
  private vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;
  private fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;
  private _ctx: WebGLRenderingContext;

  constructor(ctx: WebGLRenderingContext) {
    this._ctx = ctx;
  }

  public initShaderProgram() {
    const vertexShader = this.loadShader(
      this._ctx,
      this._ctx.VERTEX_SHADER,
      this.vsSource
    );
    const fragmentShader = this.loadShader(
      this._ctx,
      this._ctx.FRAGMENT_SHADER,
      this.fsSource
    );

    // Create the shader program

    const shaderProgram = this._ctx.createProgram();
    this._ctx.attachShader(shaderProgram, vertexShader);
    this._ctx.attachShader(shaderProgram, fragmentShader);
    this._ctx.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!this._ctx.getProgramParameter(shaderProgram, this._ctx.LINK_STATUS)) {
      alert(
        "Unable to initialize the shader program: " +
          this._ctx.getProgramInfoLog(shaderProgram)
      );
      return null;
    }

    return shaderProgram;
  }

  private loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(
        "An error occurred compiling the shaders: " +
          gl.getShaderInfoLog(shader)
      );
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }
}
