const OutputHandler = require("./../Util/OutputHandler.js");
/*
    The reason is because for some reason when a class is instantiated it cant access the modules 
    unless they are defined inside of each instance
*/
class Party {
    max_players = 6;
    id = null;
    host = null;
    players = [];

    static valid_characters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz123456789";

    constructor() {
        this.GeneratePartyID();
    }

    Update() { }

    GeneratePartyID() {
        var id_s = "";
        for (var i = 0; i < 6; i++) {
            var r_num = Math.floor(Math.random() * (Party.valid_characters.length - 1));
            id_s += Party.valid_characters[r_num];
        }

        this.id = id_s;
        OutputHandler.Log(this.id);
    }

    SetHost(player) {
        this.host = player;
        player.party = this;
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

                if (!is_in_party) {
                    this.players.push(player);
                    player.party = this;
                    NetworkHandler.SendPacket(player.socket, PacketTypes.party_join_response, { outcome: "Success", reason: "Party Not Found" });
                } else {
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
}

module.exports = Party;