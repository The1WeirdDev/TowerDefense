module.exports = class PacketTypes {
    /*
        Could save some lines of code with removing some of these and combining them for client and server
        But i like this system
    */

    //Server connections
    static connect = "connect";
    static disconnect = "disconnect";

    //Request to do certain operations
    static party_join_request = "request_party_join";
    static party_create_request = "request_party_create";
    static party_leave_request = "request_party_leave";

    //Responses to Request
    static party_join_response = "response_party_join";
    static party_create_response = "response_party_create";
    static party_leave_response = "response_party_leave";

    //Asking the server for data
    static get_player_data = "get_player_data";
    static get_server_version = "get_server_version";
}