class Keyboard {
    static #keys = new Array(222);
    static keys_pressed = [];
    static keys_released = [];

    //Keys length is 222 because that are the amount of keycodes
    static Init() {
        for (var i = 0; i < 222; i++) {
            Keyboard.#keys[i] = 0;
        }

        document.addEventListener("keyup", (e) => { Keyboard.OnKeyUp(e); });
        document.addEventListener("keydown", (e) => { Keyboard.OnKeyDown(e); });
    }

    static Update() {
        for (var i = 0; i < 222; i++) {
            if (Keyboard.#keys[i] == 2) {
                Keyboard.#keys[i] = 1;
            }
        }

        //Checking if keys were pressed
        while (Keyboard.keys_pressed.length > 0) {
            Keyboard.#keys[Keyboard.keys_pressed[0]] = 2;

            if (UI.focused_frame)
                if (UI.focused_frame.on_key_pressed)
                    UI.focused_frame.on_key_pressed(Keyboard.keys_pressed[0]);

            Keyboard.keys_pressed.shift();
        }

        //Checking if keys were released
        while (Keyboard.keys_released.length > 0) {
            Keyboard.#keys[Keyboard.keys_released[0]] = 0;
            if (UI.focused_frame)
                if (UI.focused_frame.on_key_released)
                    UI.focused_frame.on_key_released(Keyboard.keys_released[0]);

            Keyboard.keys_released.shift();
        }
    }


    static IsKeyPressed(key) {
        return Keyboard.#keys[key.charCodeAt(0)] == 2;
    }

    static IsKeyDown(key) {
        return Keyboard.#keys[key.charCodeAt(0)] >= 1;
    }

    static IsKeyCodeNum(keycode) {
        if (keycode >= 47 && keycode <= 57)
            return true;
        else
            return false;
    }

    static IsKeyCodeAlpha(keycode) {
        if (keycode >= 97 && keycode <= 122)
            return true;
        else
            return false;
    }

    static IsKeyCodeAlphaNum(keycode) {
        if ((keycode >= 48 && keycode <= 57) || (keycode >= 97 && keycode <= 122))
            return true;
        else
            return false;
    }

    static OnKeyUp(e) {
        var key = e.key;
        var keycode = key.charCodeAt(0);

        Keyboard.keys_released.push(keycode);
    }
    static OnKeyDown(e) {
        e.preventDefault();
        var keycode = e.key.charCodeAt(0);

        if (e.repeat) return;

        if (e.key == "F11") {
            if (Display.fullscreen == false)
                Display.OpenFullscreen();
            else
                Display.CloseFullscreen();
        } else
            Keyboard.keys_pressed.push(keycode);
    }
}