class Mouse {
    static mouse_position = null;
    static mouse_buttons = [];

    static mouse_buttons_pressed = [];
    static mouse_buttons_released = [];

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

    static Update() {
        for (var i = 0; i < 3; i++) {
            if (Mouse.mouse_buttons[i] == 2) {
                Mouse.mouse_buttons[i] = 1;
            }
        }

        //Checking if keys were pressed
        while (Mouse.mouse_buttons_pressed.length > 0) {
            Mouse.mouse_buttons[Mouse.mouse_buttons_pressed[0]] = 2;

            Mouse.mouse_buttons_pressed.shift();
        }

        //Checking if keys were released
        while (Mouse.mouse_buttons_released.length > 0) {
            Mouse.mouse_buttons[Mouse.mouse_buttons_released[0]] = 0;

            Mouse.mouse_buttons_released.shift();
        }
    }

    static IsButtonDown(button) {
        return Mouse.mouse_buttons[button] == 1;
    }
    static IsButtonPressed(button) {
        return Mouse.mouse_buttons[button] == 2;
    }

    static OnMouseMove(e) {
        const rect = Display.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        Mouse.mouse_position.x = ((x / rect.width) * 2 - 1) * 10;
        Mouse.mouse_position.y = ((y / rect.height) * -2 + 1) * (10 / Display.GetAspectRatio());
    }

    static OnMouseUp(e) {
        Mouse.mouse_buttons_released.push(e.button);
    }

    static OnMouseDown(e) {
        e.preventDefault();

        if (e.repeat) { return; }
        Mouse.mouse_buttons_pressed.push(e.button);
    }
}