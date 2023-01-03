class Game {
    static player = null;

    static Init() {
    }

    static CreatePlayer(user_id, username) {
        Game.player = new Player();
        Game.player.user_data.user_id = user_id;
        Game.player.user_data.username = username;
    }

    static Update() {
        /*
    if (button1.IsHeld(mouse_position.x, mouse_position.y, mouse_buttons[0]))
        console.log("Is Pressed");
    else
        console.log("Is not Pressed"); 
    */
    }
    static Draw() {

    }

    static CleanUp() {

    }
} 