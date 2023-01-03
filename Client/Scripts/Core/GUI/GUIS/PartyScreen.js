class PartyScreen {
    static initialized = false;
    
    static start_game_button = null;
    static leave_party_button = null;

    static player_labels = [];

    static Init() {
        if(PartyScreen.initialized == false){
            PartyScreen.start_game_button = new Button(2, -4, 3, 1);
            PartyScreen.start_game_button.frame_color = new Vector4(0.5, 0.5, 0.5, 1.0);
            PartyScreen.start_game_button.text_offset = new Vector2(0.45, 0.35);
            PartyScreen.start_game_button.on_pressed = LobbyScreen.OnPartyJoin;
            PartyScreen.start_game_button.SetTextCentered(false);
            PartyScreen.start_game_button.SetText("Start game");
            PartyScreen.start_game_button.on_pressed = PartyScreen.OnStartGamePressed;

            PartyScreen.leave_party_button = new Button(5.25, -4, 3, 1);
            PartyScreen.leave_party_button.frame_color = new Vector4(0.5, 0.5, 0.5, 1.0);
            PartyScreen.leave_party_button.text_offset = new Vector2(0.45, 0.35);
            PartyScreen.leave_party_button.on_pressed = LobbyScreen.OnPartyJoin;
            PartyScreen.leave_party_button.SetTextCentered(false);
            PartyScreen.leave_party_button.SetText("Leave Party");
            PartyScreen.leave_party_button.on_pressed = PartyScreen.OnLeavePartyPressed;

            PartyScreen.initialized = true;
        }

        PartyScreen.start_game_button.enabled = true;
        PartyScreen.leave_party_button.enabled = true;
    }

    static Update() {}

    static Draw() {
        if(Party.host.user_id == Game.player.user_data.user_id)
            UIRenderer.DrawButton(shader, PartyScreen.start_game_button);

        UIRenderer.DrawButton(shader, PartyScreen.leave_party_button);

        for(var i = 0;i < PartyScreen.player_labels.length; i++){
            UIRenderer.DrawTextLabel(shader, PartyScreen.player_labels[i]);
        }
    }

    static CleanUp() {
        if (PartyScreen.initialized) {
            PartyScreen.start_game_button.CleanUp();
            PartyScreen.leave_party_button.CleanUp();
            PartyScreen.initialized = false;
        }
    }

    static OnSetPartyData(data){
        var host = data.host;
        var players = data.players;

        //Set Party Data
        Party.host = host;
        Party.players = players;

        //Set Text Label UIS
        var host_label = PartyScreen.player_labels[0];
        if(host_label == null){
            PartyScreen.player_labels[0] = new TextLabel(-6, 3, 3.25, 0.5, 75, false, host.username.toString() + "(host)");
        }else{
            PartyScreen.player_labels[0].SetText(host.username.toString() + "(host)");
        }
        
        for(var i = 0;i < players.length; i++){
            var label = PartyScreen.player_labels[i + 1];

            if(label == null){
                PartyScreen.player_labels[i + 1] = new TextLabel(-5.75, 2.5 - (i * 0.5), 3.25, 0.5, 75, false, players[i].username.toString());
                label = PartyScreen.player_labels[i + 1];
            }else{
                PartyScreen.player_labels[i + 1].SetText(players[i].username.toString());
            }
        }
        
        while(PartyScreen.player_labels.length != players.length + 1){
            var i = PartyScreen.player_labels.length - 1;
            PartyScreen.player_labels[i].CleanUp();
            PartyScreen.player_labels.splice(i, 1);
        }
    }

    static OnStartGamePressed() {
        PartyScreen.start_game_button.enabled = false;
        PartyScreen.leave_party_button.enabled = false;
        NetworkHandler.AddPacketToQue(PacketTypes.start_game, null);
    }

    static OnLeavePartyPressed() {
        PartyScreen.start_game_button.enabled = false;
        PartyScreen.leave_party_button.enabled = false;
        NetworkHandler.AddPacketToQue(PacketTypes.party_leave_request, null);
    }
}