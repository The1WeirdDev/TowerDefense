class TextLabel extends Frame {
    text = "";
    text_color = null;
    text_mesh = null;
    text_offset = null;
    text_scale = null;
    font_size = 75;
    centered = false;

    constructor(x, y, width, height, font_size, centered, text) {
        super(x, y, width, height, new Vector4(1.0, 0.0, 0.0, 1.0));

        this.text_mesh = new BasicMesh();
        this.text_color = new Vector4(1.0, 1.0, 1.0, 1.0);
        this.text_scale = new Vector2(1.0, 1.0);
        this.text_offset = new Vector2(0, 0);

        this.centered = centered;

        if (font_size) this.font_size = font_size;

        if (text) this.SetText(text);

    }

    SetText(text) {
        this.text = text;

        var mesh_data = TextMeshGenerator.CreateMeshData(FontManager.font_roboto, this.font_size, this.text, this.centered);
        if (this.text_mesh.is_mesh_generated) {
            this.text_mesh.RemakeVertices(mesh_data[0]);
            this.text_mesh.RemakeIndices(mesh_data[1]);
        } else {
            this.text_mesh.CreateMesh([mesh_data[0], mesh_data[1]]);
        }
    }


    DrawText() {
        this.Draw();
    }

    CleanUp() {
        this.text_mesh.CleanUp();
        this.frame_mesh.CleanUp();
    }
}