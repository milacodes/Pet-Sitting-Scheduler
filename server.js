var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require("express-session");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client'));

app.use(session({
	secret: 'randosecr',
	resave: false,
	saveUninitialized: true,
	//logs out after maxAge amount of time
	cookie: { maxAge: 6000000 }
}));

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);




//listen on port 9000
app.listen(9000, function(){
	console.log('*****************');
	console.log('we hear ya! 9000.');
	console.log('*****************');
});

// io = require('socket.io').listen(server);
// ​
// io.sockets.on('connection', function(socket) {
// 	// (Listener) On Connection​
//  	console.log("Connected - Socket ID: ", socket.id);
//   	// (Listener) On Disconnect​
// 	socket.on('disconnect', function() { 
// 		console.log("Disconnected - Socket ID: ", socket.id);
//  	})
//  	socket.on('created_topic', function(data) {
//  		socket.broadcast.emit('topic_added', data);
//  	})
// });