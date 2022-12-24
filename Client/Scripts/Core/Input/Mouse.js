class Mouse {
    static mouse_position = null;
    static mouse_buttons = [];

    static Init() {
        Mouse.mouse_position = new Vector2(0, 0);
        Mouse.mouse_buttons = [0, 0, 0];
        
        Display.canvas.addEventListener("mouseup", (e) => {
            Mouse.OnMouseUp(e);
        });
        Display.canvas.addEventListener("mousedown", (e) => {
            Mouse.OnMouseDown(e);
        });
    
        Display.canvas.addEventListener("mousemove", (e) => {
            Mouse.OnMouseMove(e);
        });
    }
    
    static Update() { }

    static OnMouseMove(e) {
        const rect = Display.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        Mouse.mouse_position.x = ((x / rect.width) * 2 - 1) * 10;
        Mouse.mouse_position.y = ((y / rect.height) * -2 + 1) * (10 / Display.GetAspectRatio());
    }
    static OnMouseUp(e) {
        Mouse.mouse_buttons[e.button] = 0;
    }
    static OnMouseDown(e) {
        Mouse.mouse_buttons[e.button] = 1;
    }
}