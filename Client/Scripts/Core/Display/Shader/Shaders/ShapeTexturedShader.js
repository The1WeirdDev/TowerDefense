class ShapeTexturedShader extends Shader {
    static vertex_data = `
        precision mediump float;
        attribute vec2 position;
        
        uniform mat4 projection_matrix;
        uniform mat4 transformation_matrix;

        uniform float z_index;

        void main() {
            gl_Position = vec4(position, 0, 1);
        }
    `;
    static fragment_data = `
        precision mediump float;
        
        uniform vec4 color;
        
        void main() {
            gl_FragColor = vec4(1, 1, 1, 1);
        }
    `;
    /*
    static vertex_data = `
        precision mediump float;
        attribute vec2 position;
        attribute vec2 texture_data;
        varying vec2 out_texture_data;
        
        uniform mat4 projection_matrix;
        uniform mat4 transformation_matrix;

        void main() {
            out_texture_data = texture_data;
            gl_Position = vec4(position, 0, 1);
            //gl_Position = projection_matrix * transformation_matrix * vec4(position, 0, 1);
            //gl_Position = projectionMatrix * viewMatrix * transformationMatrix * vec4(position, 0, 1);
        }
    `;
    static fragment_data = `
        precision mediump float;
        varying vec2 out_texture_data;
        uniform sampler2D textureID;
        
        uniform vec3 color;
        
        void main() {
            gl_FragColor = vec4(0.5, 0.5, 0.5, 1);
            //gl_FragColor = texture2D(textureID, out_texture_data);
        }
    `;
    */

    projection_matrix_location = null;
    transformation_matrix_location = null;
    color_location = null;

    constructor() {
        super(ShapeTexturedShader.vertex_data, ShapeTexturedShader.fragment_data);

        this.BindAttributes();
        this.LoadAllUniformsLocation();
    }
    
    BindAttributes() {
        this.BindAttribute(0, "position");
       // this.BindAttribute(1, "texture_data");

    }
    LoadAllUniformsLocation() {
        this.projection_matrix_location = this.GetUniformLocation("projection_matrix");
        this.transformation_matrix_location = this.GetUniformLocation("transformation_matrix");

        this.z_index_location = this.GetUniformLocation("z_index");
        this.color_location = this.GetUniformLocation("color");
    }
}