class LobbyScreen {
    static is_initialized = false;

    static user_id_label = null;
    static background_frame = null;

    static Init() {
        Display.SetBackgroundColor(0.25098039215, 0.25098039215, 0.25098039215);

        LobbyScreen.background_frame = new Frame(-5, -4, 10, 8, new Vector3(1, 0, 0));
        LobbyScreen.user_id_label = new TextLabel(50, false, "Id : " + '\"' + NetworkHandler.server_socket.id + '\"');
        LobbyScreen.user_id_label.transform.position = new Vector2(-9.5, 4.5);

        LobbyScreen.is_initialized = true;
    }
    static Update() { }
    static Draw() {
        UIRenderer.DrawFrame(shader, LobbyScreen.background_frame);
        UIRenderer.DrawTextLabel(shader, LobbyScreen.user_id_label);
    }

    static CleanUp() {
        if (LobbyScreen.is_initialized) {
            //Proceed to CleanUp

            LobbyScreen.background_frame.CleanUp();
            LobbyScreen.user_id_label.CleanUp();
        }
    }
}     