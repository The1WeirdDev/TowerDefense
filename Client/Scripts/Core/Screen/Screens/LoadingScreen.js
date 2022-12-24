class LoadingScreen {
    static text_label = null;

    static Init() {
        LoadingScreen.text_label = new TextLabel(-8, -4, 4, 2, 150, false, "Loading ...");
    }
    static Update() { }
    static Draw() {
        UIRenderer.DrawTextLabel(shader, LoadingScreen.text_label);
    }
    static CleanUp() {
        LoadingScreen.text_label.CleanUp();
    }
}