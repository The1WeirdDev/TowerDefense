//This Will not be extending the normal Mesh class for now
class TextMeshGenerator {

    //Returns BasicMesh
    static CreateMeshData(font, font_size, text, centered) {
        const path = font.getPath(text, 0, 0, font_size);
        // create a list of Closed contours
        const polys = [];
        path.commands.forEach(({ type, x, y, x1, y1, x2, y2 }) => {
            switch (type) {
                case 'M':
                    polys.push(new Polygon());
                    polys[polys.length - 1].MoveTo({ x, y });
                    break;
                case 'L':
                    polys[polys.length - 1].MoveTo({ x, y });
                    break;
                case 'C':
                    polys[polys.length - 1].CubicTo({ x, y }, { x: x1, y: y1 }, { x: x2, y: y2 });
                    break;
                case 'Q':
                    polys[polys.length - 1].ConicTo({ x, y }, { x: x1, y: y1 });
                    break;
                case 'Z':
                    polys[polys.length - 1].Close();
                    break;
            }
        });

        // sort contours by descending area
        polys.sort((a, b) => Math.abs(b.area) - Math.abs(a.area));
        // classify contours to find holes and their 'parents'
        const root = [];
        for (let i = 0; i < polys.length; ++i) {
            let parent = null;
            for (let j = i - 1; j >= 0; --j) {
                // a contour is a hole if it is Inside its parent and has different winding
                if (polys[j].Inside(polys[i].points[0]) && polys[i].area * polys[j].area < 0) {
                    parent = polys[j];
                    break;
                }
            }
            if (parent) {
                parent.children.push(polys[i]);
            } else {
                root.push(polys[i]);
            }
        }

        const totalPoints = polys.reduce((sum, p) => sum + p.points.length, 0);
        var vertexData = new Float32Array(totalPoints * 2);
        let vertexCount = 0;
        const indices = [];

        var longest_x = 0;
        var longest_y = 0;

        function process(poly) {
            // construct input for earcut
            const coords = [];
            const holes = [];

            poly.points.forEach(({ x, y }) => coords.push(x, y));
            poly.children.forEach(child => {
                // children's children are new, separate shapes
                child.children.forEach(process);

                holes.push(coords.length / 2);
                child.points.forEach(({ x, y }) => {
                    if (x >= longest_x)
                        longest_x = x;
                    if (y >= longest_y)
                        longest_y = y;

                    coords.push(x, y);
                });
            });

            //  add vertex  data 
            vertexData.set(coords, vertexCount * 2);
            // add index data
            earcut(coords, holes).forEach(i => indices.push(i + vertexCount));
            vertexCount += coords.length / 2;
        }

        root.forEach(process);

        //Centering the text if it is asked
        var vertices = [];
        if (centered) {
            for (var i = 0; i < vertexData.length; i++) {
                if (i % 2 == 0)
                    vertices[i] = vertexData[i] - longest_x / 2;
                else
                    vertices[i] = vertexData[i] - longest_y / 2;
            }
        } else {
            for (var i = 0; i < vertexData.length; i++) {
                vertices[i] = vertexData[i];
            }
        }

        //Making the text size smaller to fit within the view matrix
        for (var i = 0; i < vertexData.length; i++) {
            if (i % 2 == 0)
                vertices[i] = vertices[i] * 0.00520833333;
            else
                vertices[i] = vertices[i] * -0.00520833333;
        }

        vertexData = vertices;

        const indexData = new Uint16Array(indices);
        return [vertexData, indexData];
    }
}