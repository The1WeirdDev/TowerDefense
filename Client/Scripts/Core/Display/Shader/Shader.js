class Shader {
    constructor(vertex_shader_data, fragment_shader_data) {
        this.CreateShaders(vertex_shader_data, fragment_shader_data)
    }

    CreateShaders(vertex_shader_data, fragment_shader_data) {
        this.vertex_shader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(this.vertex_shader, vertex_shader_data);
        gl.compileShader(this.vertex_shader);

        var message = gl.getShaderInfoLog(this.vertex_shader);
        if (message.length > 0) {
            throw new Error(`Could not compile vertex shader ${message}`);
        }

        this.fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(this.fragment_shader, fragment_shader_data);
        gl.compileShader(this.fragment_shader);

        var message = gl.getShaderInfoLog(this.fragment_shader);
        if (message.length > 0) {
            throw new Error(`Could not compile fragment shader ${message}`);
        }

        this.program = gl.createProgram();
        gl.attachShader(this.program, this.vertex_shader);
        gl.attachShader(this.program, this.fragment_shader);

        gl.linkProgram(this.program);
        gl.validateProgram(this.program);

        gl.detachShader(this.program, this.vertex_shader);
        gl.detachShader(this.program, this.fragment_shader);
    }

    BindAttributes() { }
    LoadAllUniformLocations() { }

    Start() {
        gl.useProgram(this.program);
    }

    Stop() {
        gl.useProgram(null);
    }

    CleanUp() {
        //Unbinding Program
        gl.useProgram(null);

        //Deleting Shaders And Programs
        gl.deleteShader(this.vertexShader);
        gl.deleteShader(this.fragmentShader);
        gl.deleteProgram(this.program)
    }

    BindAttribute(index, name) {
        gl.bindAttribLocation(this.program, index, name);
    }

    GetUniformLocation(location) {
        return gl.getUniformLocation(
            this.program,
            location
        );
    }

    LoadFloat(location, value) {
        gl.uniform1f(
            location,
            value
        );
    }

    LoadVector2(location, vec2) {
        gl.uniform2f(
            location,
            vec2.x,
            vec2.y
        );
    }

    LoadVector3(location, vec3) {
        gl.uniform3f(
            location,
            vec3.x,
            vec3.y,
            vec3.z
        );
    }

    LoadVector4(location, vec4) {
        gl.uniform4f(
            location,
            vec4.x,
            vec4.y,
            vec4.z,
            vec4.w
        );
    }

    LoadMatrix4(location, mat_4) {
        gl.uniformMatrix4fv(
            location,
            false,
            mat_4
        );
    }
}