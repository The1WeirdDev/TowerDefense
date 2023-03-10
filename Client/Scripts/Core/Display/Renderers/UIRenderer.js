class UIRenderer {
    static DrawFrame(shader, frame) {
        if(!frame.visible)
            return;

        shader.Start();
        shader.LoadFloat(shader.z_index_location, frame.z_index);
        shader.LoadVector4(shader.color_location, frame.frame_color);
        shader.LoadMatrix4(shader.transformation_matrix_location, MatrixHandler.CreateTransformationMatrix(frame.transform));

        frame.Draw();
        shader.Stop();
        
        frame.rendered_last = true;
    }

    static DrawButton(shader, button) {
        if(!button.visible)
            return;

        shader.Start();
        shader.LoadFloat(shader.z_index_location, button.z_index - 0.0001);
        shader.LoadVector4(shader.color_location, button.frame_color);
        shader.LoadMatrix4(shader.transformation_matrix_location, MatrixHandler.CreateTransformationMatrix(button.transform));

        button.frame_mesh.Draw();

        if (button.text_mesh) {
            shader.LoadFloat(shader.z_index_location, button.z_index);
            shader.LoadVector4(shader.color_location, button.text_color);
            shader.LoadMatrix4(shader.transformation_matrix_location, MatrixHandler.CreateTransformationMatrix([Vector2.Add(button.transform.position, button.text_offset), button.text_scale]));

            button.text_mesh.Draw();
        }

        shader.Stop();
        
        button.rendered_last = true;
    }

    static DrawTextLabel(shader, text_label) {
        if(!text_label.visible)
            return;

        shader.Start();

        shader.LoadFloat(shader.z_index_location, text_label.z_index - 0.0001);
        shader.LoadVector4(shader.color_location, text_label.frame_color);
        shader.LoadMatrix4(shader.transformation_matrix_location, MatrixHandler.CreateTransformationMatrix(text_label.transform));

        text_label.frame_mesh.Draw();

        shader.LoadFloat(shader.z_index_location, text_label.z_index);
        shader.LoadVector4(shader.color_location, text_label.text_color);
        shader.LoadMatrix4(shader.transformation_matrix_location, MatrixHandler.CreateTransformationMatrix([Vector2.Add(text_label.transform.position, text_label.text_offset), text_label.text_scale]));

        text_label.text_mesh.Draw();

        shader.Stop();

        text_label.rendered_last = true;
    }

    static DrawTextBox(shader, text_box) {
        if(!text_box.visible)
            return;

        shader.Start();

        shader.LoadFloat(shader.z_index_location, text_box.z_index - 0.0001);
        shader.LoadVector4(shader.color_location, text_box.frame_color);
        shader.LoadMatrix4(shader.transformation_matrix_location, MatrixHandler.CreateTransformationMatrix(text_box.transform));

        text_box.frame_mesh.Draw();

        shader.LoadFloat(shader.z_index_location, text_box.z_index);
        shader.LoadVector4(shader.color_location, text_box.text_color);
        shader.LoadMatrix4(shader.transformation_matrix_location, MatrixHandler.CreateTransformationMatrix([text_box.transform.position, text_box.text_scale]));

        text_box.text_mesh.Draw();

        shader.Stop();
        
        text_box.rendered_last = true;
    }
}