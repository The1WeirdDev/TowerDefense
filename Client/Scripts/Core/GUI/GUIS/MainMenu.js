class MainMenu {
    static button = null;
    static version = null;

    static initialized = false;

    static Init() {
        if(MainMenu.initialized == true)
            return;

        Display.SetBackgroundColor(0.25098039215, 0.25098039215, 0.25098039215);

        //Creating Main Menu Button
        MainMenu.button = new Button(-3, -1.5, 6, 3);
        MainMenu.button.text_offset = new Vector2(3, 1.4);
        MainMenu.button.SetText("Play");

        MainMenu.version = new TextLabel(9, -5.5, 0.75, 0.2, 50, false, "v" + version);
        MainMenu.version.SetFrameTransparency(1.0);
        
        MainMenu.initialized = true;
    }
    static Update() {
        if (MainMenu.button && MainMenu.button.IsHeld(0)) {
            MainMenu.CleanUp();

            //Connecting To Server
            NetworkHandler.ConnectToServer(window.location.origin);
            GUIHandler.SetGuiToHandle(LoadingScreen);
        }
    }

    static Draw() {
        if (MainMenu.button && MainMenu.version){
            UIRenderer.DrawButton(ShaderManager.shape_textureless_shader, MainMenu.button);
            UIRenderer.DrawTextLabel(ShaderManager.shape_textureless_shader, MainMenu.version);
        }
        else
            LoadingScreen.Draw();
    }

    static CleanUp() {
        if(MainMenu.initialized == false)
            return;

        MainMenu.version.CleanUp();
        MainMenu.button.CleanUp();
        MainMenu.version = null;
        MainMenu.button = null;

        MainMenu.initialized = false;
    }
}      