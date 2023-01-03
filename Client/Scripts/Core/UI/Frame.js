class Frame extends UI {
    transform = null;

    frame_mesh = null;
    frame_color = null;
    z_index = -0.1;
    #transparency = 0;

    //Hashtags make privates

    constructor(x, y, width, height, color) {
        super();

        this.frame_color = color;
        this.transform = new Transform2D(x, y);
        this.transform.scale = new Vector2(width, height);

        this.frame_mesh = new BasicMesh();
        this.frame_mesh.CreateMesh([[0, 0, 0, 1, 1, 0, 1, 1], [0, 1, 2, 2, 1, 3]]);

        if (!(this instanceof TextLabel) && !(this instanceof TextBox) && !(this instanceof Button))
            UI.frames.push(this);
        this.initialized = true;
        this.type = UI.types.Frame;
    }

    SetFrameTransparency(transparency) {
        this.#transparency = transparency;
        this.frame_color.w = 1.0 - this.#transparency;
    }

    RegenerateMesh() {
        this.frame_mesh.SubVertices([0, 0, 0, height, width, 0, width, height]);
    }

    Draw() {
        this.frame_mesh.Draw();
    }

    CleanUp() {
        this.frame_mesh.CleanUp();
        UI.frames.splice(UI.frames.indexOf(this), 1);
    }

    IsHovered() {
        if (this.enabled && Mouse.mouse_position.x >= this.transform.position.x && Mouse.mouse_position.x <= this.transform.position.x + this.transform.scale.x && Mouse.mouse_position.y >= this.transform.position.y && Mouse.mouse_position.y <= this.transform.position.y + this.transform.scale.y)
            return true;
        else
            return false;
    }
}