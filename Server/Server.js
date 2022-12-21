const express = require("express");
const http = require("http");
const fs = require("fs");
const socket_io = require("socket.io");

const app = express();
const server = http.createServer(app);
const io_server = socket_io(server);

const port = 8080;

//Classes
const NetworkHandler = require("./Networking/NetworkHandler.js");

app.get("*", (req, res) => {
    let newUrl = req.url;
    if (newUrl.startsWith("/")) newUrl = newUrl.slice(1);
    if (newUrl === "") newUrl = "Client/Index.html";

    var split = newUrl.split(".").pop();
    var type = "text/html";

    if (newUrl.startsWith("Shared/Modules/") || newUrl.startsWith("Client/Scripts/Core/Util/Modules/")) {
        type = "text/javascript";
    }

    const headers = { "Content-Type": type };
    fs.readFile(newUrl, function(error, data) {
        if (error) {
            res.writeHead(404, headers);
            res.write("<html><h1>error 404 page not found</h1></html>");
        } else {
            res.writeHead(200, headers);
            res.write(data);
        }
        res.end();
    });
});

app.use(express.static(__dirname + '/Shared'));

server.listen(port, (error, data) => {
    if (error)
        console.log(`Server failed to start because of : ${data}.`);
    else
        console.log(`Server started on port ${port}.`);
})

NetworkHandler.Init(io_server);