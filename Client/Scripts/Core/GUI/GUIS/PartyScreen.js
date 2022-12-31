class PartyScreen {
    static initialized = false;

    static leave_party_button = null;

    static Init() {
        PartyScreen.leave_party_button = new Button(3, -2, 3, 1);
        PartyScreen.leave_party_button.frame_color = new Vector4(0.5, 0.5, 0.5, 1.0);
        PartyScreen.leave_party_button.text_offset = new Vector2(0.45, 0.35);
        PartyScreen.leave_party_button.on_pressed = LobbyScreen.OnPartyJoin;
        PartyScreen.leave_party_button.SetTextCentered(false);
        PartyScreen.leave_party_button.SetText("Leave Party");
        PartyScreen.leave_party_button.on_pressed = PartyScreen.OnLeavePartyPressed;
    }

    static Update() {
        UIRenderer.DrawButton(shader, PartyScreen.leave_party_button);
    }

    static Draw() { }

    static CleanUp() {
        if (PartyScreen.initialized) {
            PartyScreen.leave_party_button.CleanUp();
        }
    }

    static OnLeavePartyPressed() {
        NetworkHandler.AddPacketToQue(PacketTypes.party_leave_request, null);
    }
}