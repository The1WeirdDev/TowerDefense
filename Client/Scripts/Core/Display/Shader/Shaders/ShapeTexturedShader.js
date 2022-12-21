class ShapeTexturedShader extends Shader {
    static vertex_data = `
        precision mediump float;
        attribute vec2 position;
        attribute vec2 texture_coord;
        varying vec2 _texture_coord;
        
        uniform mat4 projection_matrix;
        uniform mat4 transformation_matrix;

        void main() {
            _texture_coord = texture_coord;
            gl_Position = projection_matrix * transformation_matrix * vec4(position, 0, 1);
            //gl_Position = projectionMatrix * viewMatrix * transformationMatrix * vec4(position, 0, 1);
        }
    `;
    static fragment_data = `
        precision mediump float;
        varying vec2 _texture_coord;
        uniform sampler2D textureID;
        
        uniform vec3 color;
        
        void main() {
            //gl_FragColor = vec4(color, 1);
            gl_FragColor = texture2D(textureID, _texture_coord);
        }
    `;

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
        this.BindAttribute(1, "texture_data");

    }
    LoadAllUniformsLocation() {
        this.projection_matrix_location = this.GetUniformLocation("projection_matrix");
        this.transformation_matrix_location = this.GetUniformLocation("transformation_matrix");

        this.color_location = this.GetUniformLocation("color");
    }
}