class Button extends Frame {
    text = "";
    text_color = null;
    text_mesh = null;
    text_offset = null;
    text_scale = null;
    font_size = 75;

    constructor(x, y, width, height) {
        super(x, y, width, height, new Vector4(0, 0, 1, 1));

        this.text_color = new Vector4(1.0, 1.0, 1.0, 1.0);
        this.text_scale = new Vector2(1.0, 1.0);
        this.text_offset = new Vector2(1, 1);
    }

    SetText(text) {
        this.text = text;

        var mesh_data = TextMeshGenerator.CreateMeshData(FontManager.font_roboto, this.font_size, this.text, true);
        if (this.text_mesh) {
            this.text_mesh.RemakeVertices(mesh_data[0]);
            this.text_mesh.RemakeIndices(mesh_data[1]);
        } else {
            this.text_mesh = new BasicMesh();
            this.text_mesh.CreateMesh([mesh_data[0], mesh_data[1]]);
        }
    }

    CleanUp() {
        if (this.text_mesh)
            this.text_mesh.CleanUp();

        this.frame_mesh.CleanUp();
    }

    IsHeld(mouse_x, mouse_y, button) {
        if (mouse_x > this.transform.position.x && mouse_x < this.transform.position.x + this.transform.scale.x && mouse_y > this.transform.position.y && mouse_y < this.transform.position.y + this.transform.scale.y && button)
            return true;
        else
            return false;
    }
}