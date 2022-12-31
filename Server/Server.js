const express = require("express");
const http = require("http");
const fs = require("fs");
const socket_io = require("socket.io");

const app = express();
const server = http.createServer(app);
const io_server = socket_io(server);

const port = 8080;
const NOT_FOUND = "<html><h1>error 404 page not found</h1></html>";

//Classes
const OutputHandler = require("./Util/OutputHandler.js");
const PartyManager = require("./Party/PartyManager.js");
const NetworkHandler = require("./Networking/NetworkHandler.js");
const SaveHandler = require("./Save/SaveHandler.js");

//Variables
const update_rate = 60;

app.get("*", (req, res) => {
    let newUrl = req.url;
    if (newUrl.startsWith("/")) newUrl = newUrl.slice(1);
    if (newUrl === "") newUrl = "Client/Index.html";

    var type = "text/html";
    /*
    if (newUrl.startsWith("Shared/Modules/") || newUrl.startsWith("Client/Scripts/Core/Util/Modules/")) {
        type = "text/javascript";
    }
    */

    /*
    Using this as a way to only request for client/shared files instead of any coming to server Server folder
    */
    if ((newUrl.startsWith("Client") || newUrl.startsWith("Shared")) == false)
        newUrl = "random_location";

    //Putting it through a try/catch loop to avoid any errors crashing the server
    try {
        const headers = { "Content-Type": type };
        fs.readFile(newUrl, function(error, data) {
            if (error) {
                res.writeHead(404, headers);
                res.write(NOT_FOUND);
            } else {
                res.writeHead(200, headers);
                res.write(data);
            }
            res.end();
        });
    } catch (exception) {
        OutputHandler.Log(exception);
    }
});

app.use(express.static(__dirname + '/Shared'));

server.listen(port, (error, data) => {
    if (error)
        OutputHandler.Log(`Server failed to start because of : ${data}.`);
    else
        OutputHandler.Log(`Server started on port ${port}.`);
})

function Init() {
    PartyManager.Init();
    NetworkHandler.Init(io_server);
    SaveHandler.LoadPlayerData();

    setInterval(Update, 1000 / update_rate);
}

function Update() {

}

Init();