class ScreenHandler {
    static current_screen_to_handle = null;

    static Init() {
        MainMenu.Init();
        LoadingScreen.Init();

        ScreenHandler.current_screen_to_handle = MainMenu;
    }
    static Update() {
        ScreenHandler.current_screen_to_handle.Update();
    }
    static Draw() {
        ScreenHandler.current_screen_to_handle.Draw();
    }
    static CleanUp() {
        MenuHandler.CleanUp();
        LoadingScreen.CleanUp();
        LobbyScreen.CleanUp();
    }
}