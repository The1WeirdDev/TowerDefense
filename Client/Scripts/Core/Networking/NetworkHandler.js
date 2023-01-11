class NetworkHandler {
    static server_socket = null;
    static server_address = null;
    static latency = 0;

    static packets = [];

    static tick_rate = 60;
    static tick_interval = null;

    static Init() {

    }

    static ConnectToServer(address) {
        NetworkHandler.server_address = address;

        NetworkHandler.server_socket = io(address);

        NetworkHandler.server_socket.on(PacketTypes.connect, NetworkHandler.OnConnect);
        NetworkHandler.server_socket.on(PacketTypes.reconnect, NetworkHandler.OnReconnect);
        NetworkHandler.server_socket.on(PacketTypes.disconnect, NetworkHandler.OnDisconnect);

        NetworkHandler.server_socket.on(PacketTypes.party_create_response, NetworkHandler.OnPartyCreateResponse);
        NetworkHandler.server_socket.on(PacketTypes.party_join_response, NetworkHandler.OnPartyJoinResponse);
        NetworkHandler.server_socket.on(PacketTypes.party_leave_response, NetworkHandler.OnPartyLeaveResponse);
        
        NetworkHandler.server_socket.on(PacketTypes.party_deleted, NetworkHandler.OnPartyDeleted);
        NetworkHandler.server_socket.on(PacketTypes.party_set_status, NetworkHandler.OnSetPartyData);
        NetworkHandler.server_socket.on(PacketTypes.start_game, NetworkHandler.OnGameStarted);

        NetworkHandler.server_socket.on(PacketTypes.get_player_data, NetworkHandler.OnGetPlayerData);

        NetworkHandler.server_socket.on(PacketTypes.set_map_data, (data)=>{
            console.log(data);
        });
    }

    static StartTicks() {
        NetworkHandler.tick_interval = setInterval(NetworkHandler.Tick, 1000 / NetworkHandler.tick_rate);
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

    static IsConnectedToServer() {
        if (!NetworkHandler.server_socket)
            return false;

        if (!NetworkHandler.server_socket.connected)
            return false;

        return true;
    }

    static AddPacketToQue(type, data) {
        NetworkHandler.packets.push([type, data]);
    }

    static SendPacket(type, data) {
        if (NetworkHandler.server_socket && NetworkHandler.IsConnectedToServer())
            NetworkHandler.server_socket.emit(type, data);
    }

    static Disconnect() {
        if (NetworkHandler.IsConnectedToServer()) {
            NetworkHandler.server_socket.disconnect();
        }
    }

    static OnConnect() {
        //NetworkHandler.server_socket.on(PacketTypes.connect, NetworkHandler.OnReconnect);

        console.log("Connected to server");
        console.log(NetworkHandler.server_socket.id);

        NetworkHandler.StartTicks();

        //NetworkHandler.getPlayers();
        LobbyScreen.Init();
        GUIHandler.SetGuisToHandle([LobbyScreen, PlayerScreen]);
        NetworkHandler.SendPacket(PacketTypes.get_player_data);
    }

    static OnReconnect() {
        console.log("Reconnected to Server");
    }

    static OnDisconnect() {
        //Disconnect to stop attemts of reconnecting for now
        NetworkHandler.Disconnect();

        console.log("Disconnected from server");

        if (NetworkHandler.tick_interval)
            clearInterval(NetworkHandler.tick_interval);
    }

    static OnPartyCreateResponse(data) {
        const outcome = data.outcome;

        //The only outcome so far is success
        if(outcome == "Success"){
            PartyScreen.Init();
            GUIHandler.SetGuisToHandle([PartyScreen, PlayerScreen]);
            console.log("Successfully created party");
        }
    }

    static OnPartyJoinResponse(data) {
        const outcome = data.outcome;

        LobbyScreen.text_box.can_add_text = true;
        LobbyScreen.text_box.SetText("");

        if (outcome == "Fail") {
            console.log("Failed to join party. Reason : " + data.reason);
        }
        else if (outcome == "Success") {
            PartyScreen.Init();
            GUIHandler.SetGuisToHandle([PartyScreen, PlayerScreen]);
            console.log("Successfully joined party");
        }
    }

    static OnPartyLeaveResponse(data){
        var outcome = data.outcome;

        if(outcome == "Success"){
            GUIHandler.SetGuisToHandle([LobbyScreen, PlayerScreen]);
            console.log("Party was deleted");
        }
    }

    static OnPartyDeleted(data){
        GUIHandler.SetGuisToHandle([LobbyScreen, PlayerScreen]);
        console.log("Successfully left the party");
    }

    static OnGetPlayerData(data) {
        Game.CreatePlayer(data[0], data[1]);
        PlayerScreen.user_id_label.SetText(data[1]);
    }

    static OnSetPartyData(data){
        PartyScreen.OnSetPartyData(data);
    }

    static OnGameStarted(data){
        console.log("Starting Game");
        PartyScreen.start_game_button.enabled = true;
        PartyScreen.leave_party_button.enabled = true;

        Game.Init();
        Game.Start();
    }
}