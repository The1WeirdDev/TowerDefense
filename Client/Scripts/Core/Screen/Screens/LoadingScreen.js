class LoadingScreen {
    static text_label = null;

    static Init() {
        LoadingScreen.text_label = new TextLabel(150, false, "Loading ...");
        LoadingScreen.text_label.transform.position = new Vector2(-8, -4);
    }
    static Update() { }
    static Draw() {
        UIRenderer.DrawTextLabel(shader, LoadingScreen.text_label);
    }
    static CleanUp() {
        LoadingScreen.text_label.CleanUp();
    }
}