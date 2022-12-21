class LobbyScreen {
    static is_initialized = false;

    static user_id_label = null;

    static Init() {
        Display.SetBackgroundColor(0, 0, 1);

        LobbyScreen.user_id_label = new TextLabel(50, false, NetworkHandler.server_socket.id);
        LobbyScreen.user_id_label.transform.position = new Vector2(-9.5, 4.5);
        
        LobbyScreen.is_initialized = true;
    }
    static Update() { }
    static Draw() {
        UIRenderer.DrawTextLabel(shader,LobbyScreen.user_id_label);
    }

    static CleanUp() {
        if (LobbyScreen.is_initialized) {
            //Proceed to CleanUp

            LobbyScreen.user_id_label.CleanUp();
        }
    }
}     