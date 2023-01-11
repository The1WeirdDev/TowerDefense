module.exports = class Game {
    static games = [];
    players = [];

    //Maps
    map1 = null;

    map = null;
    mapdata = [];
    mapsize = 8;

    constructor() {
        this.Init();

        //Add this game to the list so it gets updated
        Game.games.push(this);
    }

    static LoadMaps(){
        const Map = require("./../Maps/Map.js");
        Game.map1 = new Map("Shared/Res/Maps/map1.json");
    }

    Init() { 

    }

    Update() {
        const PacketTypes = require("./../Networking/PacketTypes.js");

        this.SendAllPlayerPackets(PacketTypes.test, "H");
    }

    LoadMap(map){
        this.map = map;
        this.mapdata = map.data;

        //TODO Send Clients Map data
        this.SendAllPlayerPackets(PacketTypes.set_map_data, this.mapdata);
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