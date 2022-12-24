const PacketTypes = require("./PacketTypes.js");
const Player = require("./../Player/Player.js");

module.exports = class NetworkHandler {
    static server = null;

    static players = [];

    static Init(server) {
        NetworkHandler.server = server;

        server.on("connection", (socket) => {
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
        socket.on("disconnect", () => {
            NetworkHandler.OnDisconnected(player);
        });

        socket.on(PacketTypes.get_player_data, () => {
            NetworkHandler.OnGetUsername(player);
        });
    }

    static OnConnected(player) {
        const ip = player.socket.handshake.headers['x-forwarded-for'].split(",")[0];
        console.log(`${player.username} Connected.`);
    }

    static OnDisconnected(player) {
        console.log(`${player.username} Disconnected.`);
    }

    static OnGetUsername(player) {
        var data = [];
        data[0] = player.user_id;
        data[1] = player.username;

        player.socket.emit(PacketTypes.get_player_data, data);
    }
}