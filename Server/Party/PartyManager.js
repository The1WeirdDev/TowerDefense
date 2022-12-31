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

    static CreateParty(host) {
        //Create the party and add it to party array
        var party = new Party();
        party.SetHost(host);
        PartyManager.partys.push(party);

        //Tell the client it was successful
        var NetworkHandler = require("./../Networking/NetworkHandler.js");
        var PacketTypes = require("./../Networking/PacketTypes.js");
        NetworkHandler.SendPacket(host.socket, PacketTypes.party_create_response, { outcome: "Success", party_id: party.id });
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

    }
}