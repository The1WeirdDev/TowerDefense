class Frame extends UI {
    transform = null;

    scale = null;

    frame_mesh = null;
    frame_color = null;
    z_index = -0.1;

    //Hashtags make privates

    constructor(x, y, width, height, color) {
        super();

        this.frame_color = color;
        this.transform = new Transform2D(x, y);
        this.transform.scale = new Vector2(width, height);

        this.frame_mesh = new BasicMesh();
        this.frame_mesh.CreateMesh([[0, 0, 0, 1, 1, 0, 1, 1], [0, 1, 2, 2, 1, 3]]);

        if (!(this instanceof TextLabel) && !(this instanceof TextBox))
            UI.frames.push(this);
    }

    RegenerateMesh() {
        this.frame_mesh.SubVertices([0, 0, 0, height, width, 0, width, height]);
    }

    Draw() {
        this.frame_mesh.Draw();
    }

    CleanUp() {
        this.frame_mesh.CleanUp();
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