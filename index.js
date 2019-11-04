// Require 'Express'
var express = require('express');

// require 'socket.io'
var socket = require('socket.io');

// binding express to app
var app = express();

// listen to port
let port = process.env.PORT;
if(port == null || port == ""){
	port = 5000;
}

var server = app.listen(port, function(){
	console.log('Server listening.');
});

// Static files
app.use(express.static('public'));

// socket setup
var io = socket(server);

// establishing connection between 'socket' and 'server' 
io.on('connection', (socket) => {

	// 'socket.id' for every new 'client' connection 
	console.log('Socket connection established with server with ID -> ', socket.id);

	// displaying data
	socket.on('chat', function(data){
		io.sockets.emit('chat', data);
	});

	// realtime 'typing' indicator
	socket.on('typing',function(data){
		socket.broadcast.emit('typing',data);
	});
});