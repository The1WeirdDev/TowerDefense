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
        const PacketTypes = require("./../Networking/PacketTypes.js");
        
        this.SendAllPlayerPackets(PacketTypes.test, "H");
    }

    SendAllPlayerPackets(type, data){
        this.players.forEach((player, index)=>{
            player.SendPacket(type, data);
        });
    }

    SendPlayerPacket(player, type, data){
        player.SendPacket(type, data);
    }
}