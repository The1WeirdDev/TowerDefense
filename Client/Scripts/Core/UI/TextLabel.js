class TextLabel extends UI {
    transform;

    text = null;
    font_size = null;

    mesh = null;
    color = null;
    centered = false;

    constructor(font_size, centered, text) {
        super();

        this.font_size = font_size;
        this.text = text;
        this.transform = new Transform2D();

        this.transform.scale.x = (10.0 / 1920.0);
        this.transform.scale.y = (-10.0 / 1920.0);

        this.centered = centered;
        this.color = new Vector3(1, 1, 1);

        var data = TextMeshGenerator.CreateMeshData(FontManager.font_roboto, this.font_size, this.text, this.centered);
        this.mesh = new BasicMesh();
        this.mesh.CreateMesh([data[0], data[1], gl.DYNAMIC_DRAW]);
    }

    SetText(text) {
        //this.CleanUp();

        this.text = text;
        this.RegenerateMesh();
    }

    SetFontSize(font_size) {
        this.CleanUp();

        this.font_size = font_size;
        this.RegenerateMesh();
    }

    RegenerateMesh() {
        //this.mesh = ShapeMeshGenerator.CreateBoxMesh(1, 1);
        var mesh_data = TextMeshGenerator.CreateMeshData(FontManager.font_roboto, this.font_size, this.text, this.centered);
        this.mesh.RemakeVertices(mesh_data[0]);
        this.mesh.RemakeIndices(mesh_data[1]);
    }

    Draw() {
        if (this.mesh)
            this.mesh.Draw();
    }

    CleanUp() {
        if (this.mesh) {
            this.mesh.CleanUp();
            this.mesh = null;
        }
    }
}