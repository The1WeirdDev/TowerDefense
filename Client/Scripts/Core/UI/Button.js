class Button extends Frame {

    //Mouse button to trigger
    button = 0;
    z_index = -0.1;
    text_label = null;

    constructor(x, y, width, height, text) {
        super(x, y, width, height, new Vector3(0.5, 0.5, 0.5));

        this.text_label = new TextLabel(50, true, text);

        UI.buttons.push(this);
    }

    SetText(text) {
        this.text_label.SetText(text);
    }

    CleanUp() {
        if (this.text_label)
            this.text_label.CleanUp();

        this.mesh.CleanUp();
        this.mesh = null;
    }

    IsHeld(mouse_x, mouse_y, button) {
        var mouse_to_rel_x = mouse_x;
        var mouse_to_rel_y = mouse_y;

        if (mouse_to_rel_x >= this.position.x && mouse_to_rel_x <= this.position.x + this.scale.x && mouse_to_rel_y >= this.position.y && mouse_to_rel_y <= this.position.y + this.scale.y && button)
            return true;
        else
            return false;
    }

    IsPressed() {
        var mouse_to_rel_x = mouse_x / Display.width;
        var mouse_to_rel_y = mouse_y / Display.height;

        if (mouse_to_rel_x >= this.x && mouse_to_rel_x <= this.x + this.width && mouse_to_rel_y >= this.y && mouse_to_rel_y <= this.y + this.height && button)
            return true;
        else
            return false;
    }
}
/*
    s Button extends UI {
    position = null;
    scale = null;
    
    transform = null;
    mesh = null;
    
    color = null;
    
    //Mouse button to trigger
    button = 0;
    z_index = -0.1;
    text_label = null;
    
        tructor(x, y, width, height, text) {
        super();
        
        this.color = new Vector3(0, 1, 0);
        this.position = new Vector2(x, y);
        this.scale = new Vector2(width, height);
        
        this.transform = new Transform2D();
        
        this.mesh = new BasicMesh();
        this.mesh.CreateMesh([[x, y, x, y + height, x + width, y, x + width, y + height], [0, 1, 2, 2, 1, 3]]);
        
        this.text_label = new TextLabel(50, true, text);
        
        UI.buttons.push(this);
    }
    
        ext(text) {
        this.text_label.SetText(text);
    }
    
        nerateMesh() {
            this.mesh)
            this.mesh.SubVertices([0, 0, 0, y, x, 0, x, y]);
    }
    
        () {
            this.mesh)
            this.mesh.Draw();
    }
    
        nUp() {
            this.text_label)
            this.text_label.CleanUp();
        
        this.mesh.CleanUp();
        this.mesh = null;
    }
    
        vered(mouse_x, mouse_y) {
        var mouse_to_rel_x = mouse_x;
        var mouse_to_rel_y = mouse_y;
        
            mouse_to_rel_x >= this.position.x && mouse_to_rel_x <= this.position.x + this.scale.x && mouse_to_rel_y >= this.position.y && mouse_to_rel_y <= this.position.y + this.scale.y)
            return true;
            
            return false;
    }
    
        ld(mouse_x, mouse_y, button) {
        var mouse_to_rel_x = mouse_x;
        var mouse_to_rel_y = mouse_y;
        
            mouse_to_rel_x >= this.position.x && mouse_to_rel_x <= this.position.x + this.scale.x && mouse_to_rel_y >= this.position.y && mouse_to_rel_y <= this.position.y + this.scale.y && button)
            return true;
            
            return false;
    }
    
        essed() {
        var mouse_to_rel_x = mouse_x / Display.width;
        var mouse_to_rel_y = mouse_y / Display.height;
        
            mouse_to_rel_x >= this.x && mouse_to_rel_x <= this.x + this.width && mouse_to_rel_y >= this.y && mouse_to_rel_y <= this.y + this.height && button)
            return true;
            
            return false;
    }
}*/