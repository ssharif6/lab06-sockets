'use strict';
var ip = require('ip');

//make the client
const net = require('net'),
    readline = require('readline'),
    client = new net.Socket(),
    io = readline.createInterface(process.stdin, process.stdout);
    

client.on('data', function(data) { //when we get data
    console.log("Output " + data)
});

client.on('close', function() { //when connection closed
    console.log("Connection closed");
});


var HOST = ip.address();
var PORT = 3000;

//connect to the server
client.connect(PORT, HOST, function() {
   console.log('Connected to: ' + HOST + ':' + PORT);

   //send message to server
   client.write("Hello server, I'm the client!");
});




