class Game {
    static player = null;
    static map = null;
    static gamemapdata = [];

    static background_image = null;

    static is_game_started = false;
    static waiting_for_map = true;

    static Init() {
        Game.background_image = new Mesh2D(null, [0, 0, 0, 1, 1, 0, 1, 1], [0, 1, 2, 2, 1, 3], [1, 1, 1, 0, 0, 1, 0, 0]);
        Game.background_image.transform.position = new Vector2(-10, -10);
        Game.background_image.transform.scale = new Vector2(20, 20);
    }

    static Start(){
        //Start Game
        Game.is_game_started = true;
        GUIHandler.SetGuisToHandle([GameScreen]);
    }

    static CreatePlayer(user_id, username) {
        Game.player = new Player();
        Game.player.user_data.user_id = user_id;
        Game.player.user_data.username = username;
    }

    static Update() {
        if(Game.waiting_for_map || Game.is_game_started == false)
            return;

    }
    static Draw() {
        MeshRenderer.DrawMesh(ShaderManager.shape_textured_shader, Game.background_image);
    }

    static CleanUp() {
        Game.background_image.CleanUp();
    }

    static SetMapData(map){
        Game.map = map;
        Game.gamemapdata = Game.map.mapdata;
        Game.waiting_for_map = false;
        Game.background_image.LoadTexture(Game.map.background_image);
    }
} 