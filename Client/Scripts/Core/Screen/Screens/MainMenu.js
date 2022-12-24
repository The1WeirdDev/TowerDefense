class MainMenu {
    static button = null;
    static Init() {
        Display.SetBackgroundColor(0.25098039215, 0.25098039215, 0.25098039215);
        MainMenu.button = new Button(-3, -1.5, 6, 3);
        MainMenu.button.SetText("Play");
    }
    static Update() {
        if (MainMenu.button && MainMenu.button.IsHeld(Mouse.mouse_position.x, Mouse.mouse_position.y, Mouse.mouse_buttons[0])) {
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