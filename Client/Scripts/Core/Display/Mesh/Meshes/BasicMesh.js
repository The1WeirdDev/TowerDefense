class BasicMesh extends Mesh {
    constructor() {
        super();
    }

    CreateMesh(data) {
        const vertex_data = data[0];
        const index_data = data[1];
        var draw_type = data[2];


        if (vertex_data == null || index_data == null) {
            console.log("Null Vertex or Index data for creating mesh. Stopping progress.");
            return;
        }

        if (!draw_type)
            draw_type = gl.STATIC_DRAW;

        this.vao_id = gl.createVertexArray();
        gl.bindVertexArray(this.vao_id);

        //Buffering Vertex Data
        this.vbo_id = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo_id);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(vertex_data),
            draw_type//gl.DYNAMIC_DRAW
        );

        //Binding vertex_data
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.disableVertexAttribArray(0);

        //Buffering Index Data
        this.ebo_id = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo_id);
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(index_data),
            draw_type//gl.DYNAMIC_DRAW
        );

        //Texture Data
        /*
        this.tbo_id = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.tbo_id);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(texture_data),
            gl.STATIC_DRAW
        );*/

        //Binding vertex_data
        //gl.enableVertexAttribArray(0);
        //gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        //gl.disableVertexAttribArray(0);

        /*
        //Loading Texture
        this.texture_id = null;
        if (shouldLoad) this.texture_id = loadTexture(gl, textureLocation);
        */

        //Unbinding Buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);

        this.vertex_count = index_data.length;
        this.is_mesh_generated = true;
    }

    Draw() {
        if (!this.is_mesh_generated)
            return;

        //Binding Vaos and Vbos
        gl.bindVertexArray(this.vao_id);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo_id);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo_id);

        //Drawing
        gl.enableVertexAttribArray(0);
        gl.drawElements(gl.TRIANGLES, this.vertex_count, gl.UNSIGNED_SHORT, 0);
        gl.disableVertexAttribArray(0);

        //Uninding Vbos
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }

    CleanUp() {
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);

        gl.deleteBuffer(this.vbo_id);
        gl.deleteBuffer(this.ebo_id);
        gl.deleteVertexArray(this.vao_id);
    }

    RemakeVertices(vertices) {
        gl.bindVertexArray(this.vao_id);

        //Deleting the buffer and creating a new one
        gl.deleteBuffer(this.vbo_id);

        this.vbo_id = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo_id);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(vertices),
            gl.STATIC_DRAW
        );

        //Binding vertex_data
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.disableVertexAttribArray(0);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }

    RemakeIndices(indices) {
        gl.bindVertexArray(this.vao_id);

        //Deleting the buffer and creating a new one
        gl.deleteBuffer(this.ebo_id);

        this.ebo_id = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo_id);
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices),
            gl.STATIC_DRAW
        );

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);

        this.vertex_count = indices.length;

    }
}
