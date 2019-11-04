// Establish connection between 'client' and 'socket'
var socket = io.connect(window.location.hostname);

// Checking DOM for changes
var message = document.getElementById('message');
var username = document.getElementById('username');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emitting messages
btn.addEventListener('click', function(){
	socket.emit('chat',{
		message: message.value,
		username: username.value
	});
	message.value = "";
});

// 'Typing' message
message.addEventListener('keypress', function(){
	socket.emit('typing',username.value)
});

// Listening to messages
socket.on('chat', function(data){
	feedback.innerHTML = '';
	output.innerHTML += '<p><strong>' + data.username + ':</strong>  ' + data.message + '</p>';
});

socket.on('typing', function(data){
	feedback.innerHTML = '<p><em>' + data + ' is typing message...</em></p>';
});