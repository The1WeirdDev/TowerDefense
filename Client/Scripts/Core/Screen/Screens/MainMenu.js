class MainMenu {
    static button = null;
    static Init() {
        MainMenu.button = new Button(-4, -2, 8, 4, "Play");
    }
    static Update() {
        if (MainMenu.button && MainMenu.button.IsHeld(mouse_position.x, mouse_position.y, mouse_buttons[0])) {
            MainMenu.CleanUp();

            //Connecting To Server
            NetworkHandler.ConnectToServer(window.location.origin, "SussyBoy123");
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