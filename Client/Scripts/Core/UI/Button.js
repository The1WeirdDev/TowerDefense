class Button extends Frame {
    enabled = true;
    text = "";
    text_centered = true;
    text_color = null;
    text_mesh = null;
    text_offset = null;
    text_scale = null;
    font_size = 75;

    constructor(x, y, width, height) {
        super(x, y, width, height, new Vector4(0.75, 0.75, 0.75, 1));

        this.text_color = new Vector4(1.0, 1.0, 1.0, 1.0);
        this.text_scale = new Vector2(1.0, 1.0);
        this.text_offset = new Vector2(0, 0);

        UI.buttons.push(this);
        this.initialized = true;
        this.type = UI.types.Button;
    }

    SetTextCentered(centered) {
        this.text_centered = centered;
    }


    SetText(text) {
        this.text = text;

        var mesh_data = TextMeshGenerator.CreateMeshData(FontManager.font_roboto, this.font_size, this.text, this.text_centered);
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
        UI.buttons.splice(UI.buttons.indexOf(this), 1);
    }

    IsHeld(button) {
        if (this.enabled && Mouse.mouse_position.x >= this.transform.position.x && Mouse.mouse_position.x <= this.transform.position.x + this.transform.scale.x && Mouse.mouse_position.y >= this.transform.position.y && Mouse.mouse_position.y <= this.transform.position.y + this.transform.scale.y && Mouse.mouse_buttons[button] != 0)
            return true;
        else
            return false;
    }

    IsHovered() {
        if (this.enabled && Mouse.mouse_position.x >= this.transform.position.x && Mouse.mouse_position.x <= this.transform.position.x + this.transform.scale.x && Mouse.mouse_position.y >= this.transform.position.y && Mouse.mouse_position.y <= this.transform.position.y + this.transform.scale.y)
            return true;
        else
            return false;
    }

    IsPressed(button) {
        if (this.enabled && Mouse.mouse_position.x >= this.transform.position.x && Mouse.mouse_position.x <= this.transform.position.x + this.transform.scale.x && Mouse.mouse_position.y >= this.transform.position.y && Mouse.mouse_position.y <= this.transform.position.y + this.transform.scale.y && Mouse.mouse_buttons[button] == 2)
            return true;
        else
            return false;
    }

}