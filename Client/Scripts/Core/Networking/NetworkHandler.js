class NetworkHandler {
    static server_socket = null;
    static server_address = null;
    static is_connected = false;
    static latency = 0;

    static packets = [];

    static tick_rate = 60;

    static Init() {
        setInterval(NetworkHandler.Tick, 1000 / NetworkHandler.tick_rate);
    }

    static ConnectToServer(address) {
        NetworkHandler.server_address = address;

        NetworkHandler.server_socket = io(address);

        NetworkHandler.server_socket.on("connect", NetworkHandler.OnConnect);
        NetworkHandler.server_socket.on("disconnect", NetworkHandler.OnDisconnect);

        NetworkHandler.server_socket.on(PacketTypes.get_player_data, (data) => {
            NetworkHandler.OnGetPlayerData(data);
        })

        /*
        NetworkHandler.server_socket.on("set_block", NetworkHandler.onSetBlock);

        NetworkHandler.server_socket.on(
            "set_players",
            NetworkPlayerHandler.onSetPlayers
        );
        NetworkHandler.server_socket.on("add_player", NetworkPlayerHandler.onAddPlayer);
        NetworkHandler.server_socket.on(
            "remove_player",
            NetworkPlayerHandler.onRemovePlayer
        );
        NetworkHandler.server_socket.on(
            "set_player_pos",
            NetworkPlayerHandler.onSetPlayerPos
        );

        NetworkHandler.server_socket.on(
            "on_send_message",
            PlayerMessageHandler.onMessage
        );

        NetworkHandler.server_socket.on(
            "set_chunk_data",
            PlayerMessageHandler.onSetChunkData
        );
        NetworkHandler.server_socket.on("set-health", NetworkPlayerHandler.onSetHealth);
        */
        //NetworkHandler.server_socket.emit("set_player_username", username);

        //NetworkPlayerHandler.cleanUp();
        //NetworkPlayerHandler.Players = [];
    }

    static Tick() {
        while (NetworkHandler.packets.length > 0) {
            var packet = NetworkHandler.packets[0];
            NetworkHandler.SendPacket(packet[0], packet[1]);
            NetworkHandler.packets.shift();
        }
    }

    static CleanUp() {
        NetworkHandler.Disconnect();

        this.server_socket = null;
        this.server_address = null;
    }

    static AddPacketToQue(type, data) {
        NetworkHandler.packets.push([type, data]);
    }

    static SendPacket(type, data) {
        if (NetworkHandler.server_socket && NetworkHandler.is_connected)
            NetworkHandler.server_socket.emit(type, data);
    }

    static Disconnect() {
        if (NetworkHandler.is_connected) {

            NetworkHandler.server_socket.disconnect();
            NetworkHandler.is_connected = false;
        }
    }

    static OnConnect() {
        console.log("Connected to server");
        console.log(NetworkHandler.server_socket.id);

        NetworkHandler.is_connected = true;

        //NetworkHandler.getPlayers();
        LobbyScreen.Init();
        ScreenHandler.current_screen_to_handle = LobbyScreen;
        NetworkHandler.SendPacket(PacketTypes.get_player_data);
    }

    static OnDisconnect() {
        NetworkHandler.is_connected = false;
        console.log("Disconnected from server");
    }

    static OnGetPlayerData(data) {
        Game.CreatePlayer(data[0], data[1]);
        LobbyScreen.user_id_label.SetText(data[1]);
    }
}
