const PacketTypes = require("./PacketTypes.js");
const Player = require("./../Player/Player.js");

module.exports = class NetworkHandler {
    static server = null;

    static players = [];

    static Init(server) {
        NetworkHandler.server = server;

        server.on("connection", (socket) => {
            NetworkHandler.SetSocketPacketHandlers(socket);

            NetworkHandler.OnConnected(socket);
        });
    }

    static BroadcastPacket(type, data) {
        NetworkHandler.server.sockets.emit(type, data);
    }

    static SetSocketPacketHandlers(socket) {
        socket.on("disconnect", () => {
            NetworkHandler.OnDisconnected(socket);
        });
    }

    static OnConnected(socket) {
        const ip = socket.handshake.headers['x-forwarded-for'].split(",")[0];
        console.log(`${socket.id} Connected.`);

        const player = new Player(socket.id);
        NetworkHandler.players.push(player);

        NetworkHandler.BroadcastPacket(PacketTypes.get_username, socket.id);
    }

    static OnDisconnected(socket) {
        console.log(`${socket.id} Disconnected.`);
    }
}