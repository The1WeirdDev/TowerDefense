class MatrixHandler {
    static CreateOrthographicProjectionMatrix(size) {
        return mat4.ortho(
            mat4.create(),
            -size,
            size,
            -size / (16 / 9),
            size / (16 / 9),
            - 1.0,
            1.0
        );
    }

    static CreateTransformationMatrix(object) {
        let matrix = mat4.create();

        if (object instanceof Transform2D) {
            //Move And Scale the object with the Transform2D
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
        } else if (Array.isArray(object)) {
            if (object[0] instanceof Vector2 && object[1] instanceof Vector2) {
                glMatrix.mat4.translate(matrix, matrix, [
                    object[0].x,
                    object[0].y,
                    0
                ]);

                glMatrix.mat4.scale(matrix, matrix, [
                    object[1].x,
                    object[1].y,
                    1
                ]);
            }
        }

        return matrix;
    }
}   