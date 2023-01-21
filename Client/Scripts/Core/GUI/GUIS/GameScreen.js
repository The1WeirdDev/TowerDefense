class GameScreen{
    static initialized = false;
    static mesh2d = null;

    static Init(){
        if(GameScreen.initialized == false){
            //Create Meshes
            GameScreen.mesh2d = new Mesh2D(null, [0,0, 0, 1, 1,0, 1,1], [0, 1, 2, 2, 1, 3]);
            GameScreen.waiting_for_map = new TextBox(-2.5, -1, 5, 2, 100, true, "Waiting For Map");
            GameScreen.waiting_for_map.text_offset = new Vector2(2.4, 0.85);

            GameScreen.initialized = true;
        }
    }
    static Update(){
        Game.Update();
    }
    static Draw(){
        if(Game.waiting_for_map == true)
            UIRenderer.DrawTextLabel(ShaderManager.shape_textureless_shader, GameScreen.waiting_for_map);
        else{
            Game.Draw();
        }
    }
    static CleanUp(){
        if(GameScreen.initialized){
            GameScreen.waiting_for_map.CleanUp();
            GameScreen.mesh2d.CleanUp();

            GameScreen.initialized = false;
        }
    }
}