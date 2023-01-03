class GUIHandler {
    static current_guis_to_handle = [];

    static Init() {
        MainMenu.Init();
        PlayerScreen.Init();
        LoadingScreen.Init();

        GUIHandler.AddGuiToHandle(MainMenu);
    }

    static Update() {
        for (var i = 0; i < GUIHandler.current_guis_to_handle.length; i++)
            GUIHandler.current_guis_to_handle[i].Update();
    }

    static Draw() {
        for (var i = 0; i < GUIHandler.current_guis_to_handle.length; i++)
            GUIHandler.current_guis_to_handle[i].Draw();
    }

    static SetGuiToHandle(gui) {
        GUIHandler.current_guis_to_handle = [gui];
    }
    static SetGuisToHandle(guis) {
        GUIHandler.current_guis_to_handle = guis;
    }

    static AddGuiToHandle(gui) {
        GUIHandler.current_guis_to_handle.push(gui);
    }

    static RemoveGuiToHandle(gui) {
        var i = GUIHandler.current_guis_to_handle.indexOf(gui);

        if (i >= 0)
            GUIHandler.current_guis_to_handle.splice(i, 1);
    }

    static CleanUp() {
        PlayerScreen.CleanUp();
        PartyScreen.CleanUp();
        LoadingScreen.CleanUp();
        LobbyScreen.CleanUp();
        MainMenu.CleanUp();
    }
}