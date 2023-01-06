//const NetworkHandler = require("./../Networking/NetworkHandler.js");
//const PacketTypes = require("./../Networking/PacketTypes.js");
const OutputHandler = require("./../Util/OutputHandler.js");
const Party = require("./Party.js");

module.exports = class PartyManager {
    //static NetworkHandler = require("./../Networking/NetworkHandler.js");
    //static PacketTypes = require("./../Networking/PacketTypes.js");

    static partys = [];

    static Init() { }
    static Update() { }

    static GetPartyFromId(id) {
        for (var i = 0; i < PartyManager.partys.length; i++) {
            var party = PartyManager.partys[i];

            if (party) {
                if (party.id == id) {
                    return party;
                }
            }
        }

        return null;
    }

    static StartGame(player){
        var party = PartyManager.GetPartyFromId(player.party_id);

        if(party){
            party.StartGame();
        }
    }

    static CreateParty(host) {
        //Create the party and add it to party array
        var party = new Party();
        party.SetHost(host);
        PartyManager.partys.push(party);

        //Tell the client it was successful
        var NetworkHandler = require("./../Networking/NetworkHandler.js");
        var PacketTypes = require("./../Networking/PacketTypes.js");
        NetworkHandler.SendPacket(host.socket, PacketTypes.party_create_response, { outcome: "Success", party_id: party.id });

        party.BroadcastPartyDataChange();
    }

    static JoinParty(plr, id) {
        var party = PartyManager.GetPartyFromId(id);

        if (party) {
            party.AddPlayer(plr);
        } else {
            var NetworkHandler = require("./../Networking/NetworkHandler.js");
            var PacketTypes = require("./../Networking/PacketTypes.js");

            NetworkHandler.SendPacket(plr.socket, PacketTypes.party_join_response, { outcome: "Fail", reason: "Party Not Found" });
        }
    }

    static LeaveParty(plr) {
        /*
        Just realized setting the players party to null could actually delete the party object
        */

        var party = PartyManager.GetPartyFromId(plr.party_id);
        if(party != null){
            var NetworkHandler = require("./../Networking/NetworkHandler.js");
            var PacketTypes = require("./../Networking/PacketTypes.js");

            if(party.host == plr){
                plr.party_id = null;
                NetworkHandler.SendPacket(plr.socket, PacketTypes.party_leave_response, {outcome:"Success"});

                //Broadcast to other clients that the party was left
                party.Broadcast(plr, PacketTypes.party_deleted, null);
            }else{
                var index = party.players.indexOf(plr);
                
                //Just checking if player is in party at the moment incase
                if(index >= 0){
                    plr.party_id = null;
                    party.players.splice(index, 1);

                    NetworkHandler.SendPacket(plr.socket, PacketTypes.party_leave_response, {outcome:"Success"});

                    party.BroadcastPartyDataChange();
                }else{
                    plr.party_id = null;
                }
            }
        }else{

        }
    }
}