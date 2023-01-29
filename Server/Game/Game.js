const Tower = require("./Tower/Tower.js");

module.exports = class Game {
    static games = [];
    players = [];

    //Maps
    map1 = null;

    towers = [];
    
    map = null;
    mapdata = [];
    mapsize = 8;

    constructor() {}

    static LoadMaps(){
        const Map = require("./../Maps/Map.js");
        Game.map1 = new Map("Shared/Res/Maps/map1.json");
    }

    Init() {
        this.LoadMap(Game.map1);

        //Add this game to the list so it gets updated
        Game.games.push(this);
    }

    Update() {

    }

    LoadMap(map){
        const PacketTypes = require("./../Networking/PacketTypes.js");
        
        this.map = map;
        this.mapdata = map.mapdata;

        //TODO Send Clients Map data
        this.SendAllPlayerPackets(PacketTypes.set_map_data, this.map.GetDataAsObject());
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