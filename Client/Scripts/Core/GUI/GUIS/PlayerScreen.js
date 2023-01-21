class PlayerScreen{
    static initialized = false;
    static user_id_label = null;

    static Init(){
        PlayerScreen.user_id_label = new TextLabel(-9.5, 4.5, 2.125, 0.35, 75, false, "Getting Player Username");
        PlayerScreen.user_id_label.SetFrameTransparency(1.0);

        PlayerScreen.initialized = true;
    }
    static Update(){

    }
    static Draw(){
        UIRenderer.DrawTextLabel(ShaderManager.shape_textureless_shader, PlayerScreen.user_id_label);
    }
    static CleanUp(){
        PlayerScreen.user_id_label.CleanUp();
    }
}