class MatrixHandler {
    static CreateOrthographicProjectionMatrix(size) {
        var aspect_ratio = Display.GetAspectRatio();

        return mat4.ortho(
            mat4.create(),
            -size,
            size,
            -size / (16 / 9),
            size / (16 / 9),
            -1.0,
            1.0
        );
    }

    static CreateTransformationMatrix(object) {
        let matrix = mat4.create();

        glMatrix.mat4.translate(matrix, matrix, [
            object.position.x,
            object.position.y,
            -0.1
        ]);

        glMatrix.mat4.scale(matrix, matrix, [
            object.scale.x,
            object.scale.y,
            1
        ]);

        return matrix;
    }
}