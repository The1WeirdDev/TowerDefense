module.exports = class Tower{
    game = null;

    tower_data = null;
    last_fired = 0;
    
    constructor(game, tower_data){
        this.game = game;

        this.tower_data = tower_data;
        
        this.Init();
    }

    Init(){}
    Update(){}

    Shoot(){

    }
}