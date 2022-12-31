class LobbyScreen {
    static is_initialized = false;

    static user_id_label = null;
    static background_frame = null;
    static text_box = null;
    static join_party_button = null;
    static create_party_button = null;

    static Init() {
        LobbyScreen.user_id_label = new TextLabel(-9.5, 4.5, 2.125, 0.35, 75, false, "Getting Player Username");
        LobbyScreen.user_id_label.SetFrameTransparency(1.0);

        LobbyScreen.background_frame = new Frame(-5, -4, 10, 8, new Vector3(1, 0, 0));

        //Creating Create Party Button
        LobbyScreen.create_party_button = new Button(-1.5, 2, 3, 1);
        LobbyScreen.create_party_button.frame_color = new Vector4(0.0, 0.0, 0.0, 1.0);
        LobbyScreen.create_party_button.text_offset = new Vector2(1.25, 0.35);
        LobbyScreen.create_party_button.SetTextCentered(true);
        LobbyScreen.create_party_button.SetText("Create Party");
        LobbyScreen.create_party_button.on_pressed = LobbyScreen.OnCreateParty;

        //Creating Join Party Input
        LobbyScreen.text_box = new TextBox(-1.5, 0, 3, 1, 50, false, "");
        LobbyScreen.text_box.character_limit = 6;
        LobbyScreen.text_box.on_key_pressed = LobbyScreen.OnTextInput;

        //Creating Join Party Button
        LobbyScreen.join_party_button = new Button(-1.5, -1.1, 3, 1);
        LobbyScreen.join_party_button.frame_color = new Vector4(0.0, 0.0, 0.0, 1.0);
        LobbyScreen.join_party_button.text_offset = new Vector2(0.6, 0.35);
        LobbyScreen.join_party_button.on_pressed = LobbyScreen.OnPartyJoin;
        LobbyScreen.join_party_button.SetTextCentered(false);
        LobbyScreen.join_party_button.SetText("Join Party");

        LobbyScreen.is_initialized = true;
    }

    static Update() {
    }

    static Draw() {
        //UIRenderer.DrawFrame(shader, LobbyScreen.background_frame);
        UIRenderer.DrawTextLabel(shader, LobbyScreen.user_id_label);
        UIRenderer.DrawButton(shader, LobbyScreen.join_party_button);
        UIRenderer.DrawButton(shader, LobbyScreen.create_party_button);
        UIRenderer.DrawTextBox(shader, LobbyScreen.text_box);
    }

    static CleanUp() {
        if (LobbyScreen.is_initialized) {
            //Proceed to CleanUp

            LobbyScreen.create_party_button.CleanUp();
            LobbyScreen.join_party_button.CleanUp();
            LobbyScreen.text_box.CleanUp();
            LobbyScreen.background_frame.CleanUp();
            LobbyScreen.user_id_label.CleanUp();
        }
    }

    static OnCreateParty() {
        NetworkHandler.AddPacketToQue(PacketTypes.party_create_request, null);
    }

    static OnPartyJoin() {
        LobbyScreen.text_box.can_add_text = false;
        NetworkHandler.AddPacketToQue(PacketTypes.party_join_request, LobbyScreen.text_box.text);
    }

    static OnTextInput(key) {
        /*
            In the future maybe IsKey functions should take a instance of the key class instead of just a keycode
            This way the special characters wont be able to get put in the textbox
        */
        if (Keyboard.IsKeyCodeAlphaNum(key.keycode)) {
            LobbyScreen.text_box.AddCharacter(key.name);
        } else if (key.keycode == 8) {
            LobbyScreen.text_box.RemoveCharacter();
        }
    }
}     