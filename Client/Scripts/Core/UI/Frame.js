class Frame extends UI {
    position = null;
    scale = null;

    transform = null;
    mesh = null;

    color = null;

    z_index = -0.1;

    constructor(x, y, width, height, color) {
        super();

        this.color = color;
        this.position = new Vector2(x, y);
        this.scale = new Vector2(width, height);

        this.transform = new Transform2D();

        this.mesh = new BasicMesh();
        this.mesh.CreateMesh([[x, y, x, y + height, x + width, y, x + width, y + height], [0, 1, 2, 2, 1, 3]]);

        UI.buttons.push(this);
    }

    RegenerateMesh() {
        this.mesh.SubVertices([0, 0, 0, y, x, 0, x, y]);
    }

    Draw() {
        this.mesh.Draw();
    }

    CleanUp() {
        this.mesh.CleanUp();
        this.mesh = null;
    }

    IsHovered(mouse_x, mouse_y) {
        var mouse_to_rel_x = mouse_x;
        var mouse_to_rel_y = mouse_y;

        if (mouse_to_rel_x >= this.position.x && mouse_to_rel_x <= this.position.x + this.scale.x && mouse_to_rel_y >= this.position.y && mouse_to_rel_y <= this.position.y + this.scale.y)
            return true;
        else
            return false;
    }
}