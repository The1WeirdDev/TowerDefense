class MainMenu {
    static button = null;
    static Init() {
        Display.SetBackgroundColor(0.25098039215, 0.25098039215, 0.25098039215);
        MainMenu.button = new Button(-3, -1.5, 6, 3);
        MainMenu.button.text_offset = new Vector2(3, 1.4);
        MainMenu.button.SetText("Play");
    }
    static Update() {
        if (MainMenu.button && MainMenu.button.IsHeld(0)) {
            MainMenu.CleanUp();

            //Connecting To Server
            NetworkHandler.ConnectToServer(window.location.origin);
            ScreenHandler.current_screen_to_handle = LoadingScreen;
        }
    }

    static Draw() {
        if (MainMenu.button)
            UIRenderer.DrawButton(shader, MainMenu.button);
        else
            LoadingScreen.Draw();
    }

    static CleanUp() {
        MainMenu.button.CleanUp();
        MainMenu.button = null;
    }
}      