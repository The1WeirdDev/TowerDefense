module.exports = class PacketTypes {
    /*
        Could save some lines of code with removing some of these and combining them for client and server
        But i like this system
    */

    //Server connections
    static connect = "connect";
    static reconnect = "reconnect";
    static disconnect = "disconnect";

    //Request to do stuff for single clients
    static party_join_request = "request_party_join";
    static party_create_request = "request_party_create";
    static party_leave_request = "request_party_leave";
    static party_request_kick_player = "request_kick_player";

    //Responses to Request from single clients
    static party_join_response = "response_party_join";
    static party_create_response = "response_party_create";
    static party_leave_response = "response_party_leave";

    //Events for multiple players
    static party_set_status = "party_set_status";
    static party_deleted = "party_deleted";
    static start_game = "game_started";

    static test = "test";
    static set_map_data = "set_map_data";

    //Asking the server for data
    static get_player_data = "get_player_data";
    static get_server_version = "get_server_version";
}