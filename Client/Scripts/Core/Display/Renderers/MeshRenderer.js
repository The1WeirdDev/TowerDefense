class MeshRenderer{
    static DrawMesh(shader, mesh2d){
        shader.Start();
        
        shader.LoadFloat(shader.z_index_location, 0);
        shader.LoadVector4(shader.color_location, mesh2d.color);
        shader.LoadMatrix4(shader.transformation_matrix_location, MatrixHandler.CreateTransformationMatrix(mesh2d.transform));

        mesh2d.Draw();

        shader.Stop();
    }
}