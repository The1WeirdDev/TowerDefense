const OutputHandler = require("./../Util/OutputHandler.js");
const PacketTypes = require("./PacketTypes.js");
const Player = require("./../Player/Player.js");
const PartyManager = require("./../Party/PartyManager.js");

module.exports = class NetworkHandler {
    static server = null;

    static players = [];

    static Init(server) {
        NetworkHandler.server = server;

        server.on(PacketTypes.connect, (socket) => {
            //Creating Player Object
            const player = new Player(socket);
            NetworkHandler.players.push(player);

            NetworkHandler.SetSocketPacketHandlers(player, socket);
            NetworkHandler.OnConnected(player);
        });
    }

    static GetPlayerFromSocketId(socket_id) {
        for (var i = 0; i < NetworkHandler.players.length; i++) {
            if (NetworkHandler.players[i].socket_id == socket_id)
                return NetworkHandler.players[i];
        }

        return null;
    }

    static SendPacket(socket, type, data) {
        if (socket) {
            socket.emit(type, data);
        }
    }

    static BroadcastPacket(type, data) {
        NetworkHandler.server.sockets.emit(type, data);
    }

    static BroadcastPacketToAllExept(player, type, data) {
        for (var i = 0; i < NetworkHandler.players.length; i++) {
            if (NetworkHandler.players.socket_id != socket_id)
                NetworkHandler.players[i].socket.emit(type, data);
        }
    }

    static SetSocketPacketHandlers(player, socket) {
        socket.on(PacketTypes.disconnect, () => {
            NetworkHandler.OnDisconnected(player);
        });

        socket.on(PacketTypes.party_create_request, (data) => {
            NetworkHandler.OnPartyCreateRequest(player, data);
        });

        socket.on(PacketTypes.party_join_request, (data) => {
            NetworkHandler.OnPartyJoinRequest(player, data);
        });

        socket.on(PacketTypes.party_leave_request, (data) => {
            NetworkHandler.OnPartyLeaveRequest(player, data);
        });

        socket.on(PacketTypes.start_game, () => {
            NetworkHandler.OnGameStarted(player);
        });

        socket.on(PacketTypes.get_player_data, () => {
            NetworkHandler.OnGetUsername(player);
        });
    }

    static OnConnected(player) {
        //const ip = player.socket.handshake.headers['x-forwarded-for'].split(",")[0];
        OutputHandler.Log(`${player.username} Connected.`);
    }

    static OnDisconnected(player) {
        OutputHandler.Log(`${player.username} Disconnected.`);
        PartyManager.LeaveParty(player);
    }

    static OnPartyCreateRequest(player, data) {
        //The data send with the packet is useless for now
        PartyManager.CreateParty(player);
    }

    static OnPartyJoinRequest(player, data) {
        var id = data;

        PartyManager.JoinParty(player, id);
    }
    static OnPartyLeaveRequest(player, data) {
        var id = data;

        PartyManager.LeaveParty(player, id);
    }

    static OnGameStarted(player){
        PartyManager.StartGame(player);
    }

    static OnGetUsername(player) {
        var data = [];
        data[0] = player.user_id;
        data[1] = player.username;

        player.socket.emit(PacketTypes.get_player_data, data);
    }
}