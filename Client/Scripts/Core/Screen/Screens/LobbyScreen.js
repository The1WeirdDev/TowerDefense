class LobbyScreen {
    static is_initialized = false;

    static user_id_label = null;
    static background_frame = null;
    static text_box = null;
    static join_party_button = null;

    static Init() {
        LobbyScreen.user_id_label = new TextLabel(-9.5, 4.5, 2.125, 0.35, 75, false, "Getting Player Username");
        LobbyScreen.user_id_label.SetFrameTransparency(1.0);

        LobbyScreen.background_frame = new Frame(-5, -4, 10, 8, new Vector3(1, 0, 0));

        LobbyScreen.text_box = new TextBox(0, 0, 3, 1, 50, false, "");
        LobbyScreen.text_box.character_limit = 9;
        LobbyScreen.text_box.on_key_pressed = LobbyScreen.OnTextInput;

        LobbyScreen.join_party_button = new Button(0, -1.1, 3, 1);
        LobbyScreen.join_party_button.frame_color = new Vector4(0.0, 0.0, 0.0, 1.0);
        LobbyScreen.join_party_button.text_offset = new Vector2(0.6, 0.35);
        LobbyScreen.join_party_button.SetTextCentered(false);
        LobbyScreen.join_party_button.SetText("Join Party");
        LobbyScreen.join_party_button.on_pressed = LobbyScreen.OnPartyJoin;

        LobbyScreen.is_initialized = true;
    }

    static Update() {
    }

    static Draw() {
        //UIRenderer.DrawFrame(shader, LobbyScreen.background_frame);
        UIRenderer.DrawTextLabel(shader, LobbyScreen.user_id_label);
        UIRenderer.DrawButton(shader, LobbyScreen.join_party_button);
        UIRenderer.DrawTextBox(shader, LobbyScreen.text_box);
    }

    static CleanUp() {
        if (LobbyScreen.is_initialized) {
            //Proceed to CleanUp

            LobbyScreen.join_party_button.CleanUp();
            LobbyScreen.text_box.CleanUp();
            LobbyScreen.background_frame.CleanUp();
            LobbyScreen.user_id_label.CleanUp();
        }
    }

    static OnPartyJoin() {
        console.log("Request Join.");
    }

    static OnTextInput(keycode) {
        var key = String.fromCharCode(keycode);
        if (Keyboard.IsKeyCodeNum(keycode)) {
            LobbyScreen.text_box.AddCharacter(key);
        } else if (keycode == 66) {
            LobbyScreen.text_box.RemoveCharacter();
        }
    }
}     