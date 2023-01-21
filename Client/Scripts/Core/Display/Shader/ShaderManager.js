class ShaderManager{
    static shape_textureless_shader = null;

    static Init(){
        ShaderManager.shape_textureless_shader = new ShapeTexturelessShader();
        ShaderManager.shape_textured_shader = new ShapeTexturedShader();

        var ortho_matrix = MatrixHandler.CreateOrthographicProjectionMatrix(10);
    
        //Setting ShapeTexturelessShader ProjectionMatrix
        ShaderManager.shape_textureless_shader.Start();
        ShaderManager.shape_textureless_shader.LoadMatrix4(ShaderManager.shape_textureless_shader.projection_matrix_location, ortho_matrix);
        ShaderManager.shape_textureless_shader.Stop();

        //Setting ShapeTexturesShader ProjectionMatrix
        ShaderManager.shape_textured_shader.Start();
        ShaderManager.shape_textured_shader.LoadMatrix4(ShaderManager.shape_textured_shader.projection_matrix_location, ortho_matrix);
        ShaderManager.shape_textured_shader.Stop();

        //Attempting to free memory 
        ortho_matrix = null;
    }

    static CleanUp(){
        ShaderManager.shape_textureless_shader.CleanUp();
        ShaderManager.shape_textured_shader.CleanUp();
    }
}