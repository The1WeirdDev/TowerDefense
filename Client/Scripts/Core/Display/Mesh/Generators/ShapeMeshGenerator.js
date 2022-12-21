class ShapeMeshGenerator {
    static CreateBoxMesh(size_x, size_y) {
        var mesh = new BasicMesh();

        var vertices = [
            0, 0,
            0, size_y,
            size_x, 0,
            size_x, size_y
        ];

        var indices = [
            0, 1, 2,
            2, 1, 3
        ];


        mesh.CreateMesh([vertices, indices]);
        return mesh;
    }
}