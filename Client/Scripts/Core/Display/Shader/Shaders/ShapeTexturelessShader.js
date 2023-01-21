class ShapeTexturelessShader extends Shader {
    static vertex_data = `
        precision mediump float;
        attribute vec2 position;
        
        uniform mat4 projection_matrix;
        uniform mat4 transformation_matrix;

        uniform float z_index;

        void main() {
            gl_Position = projection_matrix * transformation_matrix * vec4(position, z_index, 1);
        }
    `;
    static fragment_data = `
        precision mediump float;
        
        uniform vec4 color;
        
        void main() {
            gl_FragColor = vec4(color);
        }
    `;
        
    projection_matrix_location = null;
    transformation_matrix_location = null;
    z_index_location = null;
    color_location = null;

    constructor() {
        super(ShapeTexturelessShader.vertex_data, ShapeTexturelessShader.fragment_data);

        this.BindAttributes();
        this.LoadAllUniformsLocation();
    }

    BindAttributes() {
        this.BindAttribute(0, "position");

    }
    LoadAllUniformsLocation() {
        this.projection_matrix_location = this.GetUniformLocation("projection_matrix");
        this.transformation_matrix_location = this.GetUniformLocation("transformation_matrix");

        this.z_index_location = this.GetUniformLocation("z_index");
        this.color_location = this.GetUniformLocation("color");
    }
}