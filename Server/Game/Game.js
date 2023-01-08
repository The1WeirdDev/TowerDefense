module.exports = class Game {
    static games = [];

    players = [];

    constructor() {
        this.Init();

        //Add this game to the list so it gets updated
        Game.games.push(this);
    }

    Init() { 

    }
    Update() { 
        console.log("Updated Game");
    }
}