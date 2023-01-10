module.exports = class Game {
    static games = [];
    players = [];

    mapdata = [];
    mapsize = 8;

    constructor() {
        this.Init();

        //Add this game to the list so it gets updated
        Game.games.push(this);
    }

    Init() { 
        const Map = require("./../Maps/Map.js");
        var map = new Map("Shared/Res/Maps/map1.json");
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