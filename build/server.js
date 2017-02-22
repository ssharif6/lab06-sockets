"use strict";
var net = require("net");
var ip = require('ip');
;
var clients = [];
var server = net.createServer();
server.on('connection', function (socket) {
    function broadcastMessage(message) {
        clients.forEach(function (client) {
            if (client !== socket) {
                client.write(message);
            }
        });
    }
    clients.push(socket);
    console.log("Hello person");
    socket.on('data', function (data) {
        var dataStr = data.toString();
        if (dataStr == "Exit") {
            socket.write("Bye");
            socket.end();
        }
        else {
            socket.write(dataStr);
        }
    });
    socket.on('close', function () {
    });
});
server.on('listening', function () {
    var addr = server.address();
    console.log('server listening on port %d', addr.port);
});
server.listen({
    host: ip.address(),
    port: 3000
});
