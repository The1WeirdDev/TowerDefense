class TexturedMesh extends Mesh {
    constructor() {
        super();
    }

    CreateMesh(data) {
        const vertex_data = data[0];
        const index_data = data[1];
        const texture_data = data[2];
        const texture_location = data[3];
        var draw_type = data[4];

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

        //Vertex Data
        this.tbo_id = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.tbo_id);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(texture_data),
            draw_type
        );

        //Binding Texture Data
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
        gl.disableVertexAttribArray(1);

        //Buffering Index Data
        this.ebo_id = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo_id);
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(index_data),
            draw_type//gl.DYNAMIC_DRAW
        );

        //Unbinding Buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
        
        //Loading Texture
        this.LoadTexture(texture_location);

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
        gl.enableVertexAttribArray(1);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture_id);
        gl.drawElements(gl.TRIANGLES, this.vertex_count, gl.UNSIGNED_SHORT, 0);
        gl.bindTexture(gl.TEXTURE_2D, null);

        gl.disableVertexAttribArray(1);
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
        gl.deleteBuffer(this.tbo_id);
        gl.deleteBuffer(this.ebo_id);
        gl.deleteVertexArray(this.vao_id);
    }

    LoadTexture(texture_location){
        this.texture_id = Texture.LoadTexture(gl, texture_location);
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
