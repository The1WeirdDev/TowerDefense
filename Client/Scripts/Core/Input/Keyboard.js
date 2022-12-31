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
            Keyboard.#keys[Keyboard.keys_pressed[0].keycode] = 2;

            if (UI.focused_frame)
                if (UI.focused_frame.on_key_pressed)
                    UI.focused_frame.on_key_pressed(Keyboard.keys_pressed[0]);

            Keyboard.keys_pressed.shift();
        }

        //Checking if keys were released
        while (Keyboard.keys_released.length > 0) {
            Keyboard.#keys[Keyboard.keys_released[0].keycode] = 0;
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

    /*
        Currently special characters like !@#$%^&*() Are getting passes this
        Sometime the keycode parameter is going to get replaced by the Key class instead
        and get the key name from those instances
    */

    static IsKeyCodeNum(keycode) {
        //var key = String.fromCharCode(keycode);
        var key = String.fromCharCode(keycode);
        //if (keycode >= 47 && keycode <= 57)
        if (/^[0-9]+$/.test(key))
            return true;
        else
            return false;
    }

    static IsKeyCodeAlpha(keycode) {
        var key = String.fromCharCode(keycode);
        if (/^[a-zA-Z]+$/.test(key))
            return true;
        else
            return false;
    }

    static IsKeyCodeAlphaNum(keycode) {
        var key = String.fromCharCode(keycode);
        if (/^[a-zA-Z0-9]+$/.test(key))
            return true;
        else
            return false;
    }

    static OnKeyUp(e) {
        var keycode = e.keyCode;
        var key = String.fromCharCode(e.key);

        Keyboard.keys_released.push(new Key(e.keyCode, e.key));
    }
    static OnKeyDown(e) {
        e.preventDefault();
        if (e.repeat) return;

        //var key = String.fromCharCode(e.keyCode);

        if (e.key == "F11") {
            if (Display.fullscreen == false)
                Display.OpenFullscreen();
            else
                Display.CloseFullscreen();
        } else {
            Keyboard.keys_pressed.push(new Key(e.keyCode, e.key));
        }
    }
}