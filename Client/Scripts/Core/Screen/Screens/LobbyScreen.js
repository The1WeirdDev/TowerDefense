class LobbyScreen {
    static is_initialized = false;

    static user_id_label = null;
    static background_frame = null;
    static text_box = null;

    static i = 0;
    static b = 0;
    static text = "Hello World!I am somewhat happy with this ui system."

    static Init() {
        LobbyScreen.user_id_label = new TextLabel(-9.5, 4.5, 2.125, 0.35, 75, false, "Getting Player Username");
        LobbyScreen.background_frame = new Frame(-5, -4, 10, 8, new Vector3(1, 0, 0));

        LobbyScreen.text_box = new TextBox(0, 0, 3, 1, 50, false, "");
        LobbyScreen.text_box.character_limit = LobbyScreen.text.length;

        LobbyScreen.is_initialized = true;
    }
    static Update() {
        if (LobbyScreen.i % 10 == 0) {
            LobbyScreen.text_box.AddCharacter(LobbyScreen.text.charAt(LobbyScreen.b));
            LobbyScreen.b++;
        }

        LobbyScreen.i++;
    }

    static Draw() {
        //UIRenderer.DrawFrame(shader, LobbyScreen.background_frame);
        UIRenderer.DrawTextLabel(shader, LobbyScreen.user_id_label);
        UIRenderer.DrawTextBox(shader, LobbyScreen.text_box);
    }

    static CleanUp() {
        if (LobbyScreen.is_initialized) {
            //Proceed to CleanUp

            LobbyScreen.text_box.CleanUp();
            LobbyScreen.background_frame.CleanUp();
            LobbyScreen.user_id_label.CleanUp();
        }
    }
}     