const OutputHandler = require("./../Util/OutputHandler.js");
const Game = require("../Game/Game.js");
/*
    The reason is because for some reason when a class is instantiated it cant access the modules 
    unless they are defined inside of each instance
*/
class Party {
    static id_length = 6;

    max_players = 6;
    id = null;
    host = null;
    players = [];

    game = null;
    game_started = false;

    static valid_characters = "123456789";

    constructor() {
        this.GeneratePartyID();
    }

    Update() { }

    GeneratePartyID() {
        var id_s = "";
        for (var i = 0; i < Party.id_length; i++) {
            var r_num = Math.floor(Math.random() * (Party.valid_characters.length - 1));
            id_s += Party.valid_characters[r_num];
        }

        this.id = id_s;
        OutputHandler.Log(this.id);
    }

    Broadcast(player, type, data){
        const NetworkHandler = require("./../Networking/NetworkHandler.js");

        if(this.host != null){
            if(this.host.user_id != player.user_id)
                NetworkHandler.SendPacket(this.host.socket, type, data);
        }

        for(var i = 0;i < this.players.length; i++){
            var plr = this.players[i];

            if(plr != null)
                if(plr.user_id != player.user_id)
                    NetworkHandler.SendPacket(plr.socket, type, data);
            
        }
    }

    BroadcastAll(type, data){
        const NetworkHandler = require("./../Networking/NetworkHandler.js");

        if(this.host != null){
            NetworkHandler.SendPacket(this.host.socket, type, data);
        }

        for(var i = 0;i < this.players.length; i++){
            var plr = this.players[i];

            if(plr != null)
                NetworkHandler.SendPacket(plr.socket, type, data);
            
        }
    }

    BroadcastPartyDataChange(){
        const PacketTypes = require("./../Networking/PacketTypes.js");
        
        //Getting all of the players user ids
        var plrs = [];
        for (var i = 0; i < this.players.length; i++) {
            var plr = this.players[i];
            
            if(plr != null)
                plrs.push({user_id : plr.user_id, username : plr.username});
        }

        //Broadcasting data to the whole party
        var data = {host:{user_id:this.host.user_id, username:this.host.username}, players: plrs};
        this.BroadcastAll(PacketTypes.party_set_status, data);
    }

    SetHost(player) {
        this.host = player;
        player.party_id = this.id;
    }

    AddPlayer(player) {
        const NetworkHandler = require("./../Networking/NetworkHandler.js");
        const PacketTypes = require("./../Networking/PacketTypes.js");

        try {
            if (this.players.length < this.max_players - 1) {
                var is_in_party = false;

                for (var i = 0; i < this.players.length; i++) {
                    if (this.players[i].user_id == player.user_id) {
                        is_in_party = true;
                    }
                }

                if (this.host.user_id == player.user_id) {
                    is_in_party = true;
                }

                //If the player is not in the party lets add him
                if (is_in_party == false) {
                    if(this.game_started){
                        NetworkHandler.SendPacket(player.socket, PacketTypes.party_join_response, { outcome: "Fail", reason: "Game Started." });
                    }
                    else{
                        this.players.push(player);
                        player.party_id = this.id;
                        NetworkHandler.SendPacket(player.socket, PacketTypes.party_join_response, { outcome: "Success", reason: "Party Not Found" });
                    
                        this.BroadcastPartyDataChange();
                    }
                } 
                else {
                    NetworkHandler.SendPacket(player.socket, PacketTypes.party_join_response, { outcome: "Fail", reason: "Already Joined" });
                }
            } else {
                NetworkHandler.SendPacket(player.socket, PacketTypes.party_join_response, { outcome: "Fail", reason: "Party Full" });
            }
        } catch (e) {
            OutputHandler.Log(e);
        }
    }

    RemovePlayer(player) {
        var plr_index = this.players.indexOf(player);
        if (plr_index >= 0) 
            this.players.splice(plr_index, 1);
    }

    StartGame(){
        const PacketTypes = require("./../Networking/PacketTypes.js");
        
        //Set Party Variable and broadcast player that it started
        this.game = new Game();

        //Set Game players to all of the players in the party
        this.game.players.push(this.host);
        this.players.forEach((player, index)=>{
            this.game.players.push(player);
        });

        this.game_started = true;
        this.BroadcastAll(PacketTypes.start_game, null);
    }
}

module.exports = Party;