class UIRenderer {
    static DrawButton(shader, button) {
        shader.Start();
        shader.LoadFloat(shader.z_index_location, button.z_index);
        shader.LoadVector3(shader.color_location, button.color);
        shader.LoadMatrix4(shader.transformation_matrix_location, MatrixHandler.CreateTransformationMatrix(button.transform));

        button.Draw();
        shader.Stop();

        if (button.text_label) {
            UIRenderer.DrawTextLabel(shader, button.text_label);
        }
    }
    static DrawTextLabel(shader, text_label) {
        shader.Start();
        shader.LoadFloat(shader.z_index_location, text_label.z_index);
        shader.LoadVector3(shader.color_location, text_label.color);
        shader.LoadMatrix4(shader.transformation_matrix_location, MatrixHandler.CreateTransformationMatrix(text_label.transform));

        text_label.Draw();
        shader.Stop();
    }
}