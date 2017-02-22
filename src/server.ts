import net = require('net');//import socket module
var ip = require('ip');

// define address interface
interface Address { port: number; family: string; address: string; };

let clients : net.Socket[] = [];

// create socket server
let server:net.Server = net.createServer();

// when the server is connected
server.on('connection', function(socket:net.Socket){

    function broadcastMessage(message : string) {
        clients.forEach(function(client) {
            if(client !== socket) {
                client.write(message);
            }
        });
    }

    clients.push(socket);
    console.log("Hello person");


    // when data is sent to the socket
    socket.on('data', function(data){
        //
        var dataStr = data.toString();

        broadcastMessage(dataStr);
    });

    socket.on('close', function(){
        // handle client disconnecting
    })


});

//when the server starts listening...
server.on('listening', function() {
    //output to the console the port number on which we are listening
    var addr:Address = server.address();
    console.log('server listening on port %d', addr.port);
});

//start the server
server.listen({
  host: ip.address(),
  port: 3000
});