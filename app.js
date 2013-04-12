var express = require('express');
var http = require('http');
var socket = require('socket.io');
var express = require('express');
var jade = require('jade');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);
var started = false;

//heroku suggestion to use port 8080
var port = process.env.PORT || 8080;
server.listen(port);

//configuration settings for express and socket.io
//production environment only
io.configure('production', function () {
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10);
  io.enable('browser client minification');
});

//development  environment only
app.configure('development', function() {
  app.locals.pretty = true;
});

//all environments
app.set('views', __dirname + '/UI');
app.set('view engine', 'jade');

//controller routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/games', function(req, res) {
  //TODO: Get list of games from mongo DB
  var gamesList = new Array();
  gamesList.push({name: "Horses"});
  gamesList.push({name: "Another Drinking Game To Implement"});

  res.render('games', {games: gamesList});
});

//look into using express.static
app.get('/style.css', function(req, res) {
  res.sendfile(__dirname + '/UI/style.css');
});

app.get('/connections.js', function(req, res) {
  res.sendfile(__dirname + '/UI/connections.js');
});

app.get('/interactions.js', function(req, res) {
  res.sendfile(__dirname + '/UI/interactions.js');
});

var players = {};
io.sockets.on('connection', function (socket) {
  console.log('A new connection has been created');
  var toSend = {};
  if (started) // if a game is in progress, tell this person!
  {
	  toSend["status"] = "started";
	  socket.emit('sendStatus', toSend);
  }
  toSend = {};
  toSend["players"] = players;
  console.log(toSend);
  socket.emit('playerListUpdate', toSend);
  socket.broadcast.emit('playerListUpdate', toSend);
  
  socket.on('requestPlayers', function(){
	  var toSend = {};
	  toSend["players"] = players;
	  console.log(toSend);
	  socket.emit('playerListUpdate', toSend);
	  socket.broadcast.emit('playerListUpdate', toSend);
  });
  
  socket.on('join', function (name, bet) {
    console.log('I am the Join function!');
<<<<<<< HEAD
	players[name]=bet;
	//wrap in another layer to format it as a type for interactions.js
	var toSend = {};
	toSend["players"] = players;
	console.log(toSend);
	socket.emit('playerListUpdate', toSend);
	socket.broadcast.emit('playerListUpdate', toSend);
=======
	  players[name]=0;
	  //wrap in another layer to format it as a type for interactions.js
	  var toSend = {};
	  toSend["players"] = players;
	  console.log(toSend);
	  socket.emit('playerListUpdate', toSend);
	  socket.broadcast.emit('playerListUpdate', toSend);
>>>>>>> master
  });
  
  socket.on('new', function () {
    console.log('I am the new game function!');
	  started = false;
	  //reset the players!
	  players = {};
	
	  //tell other clients that a new game is starting
	  var toSend = {};
	  toSend["status"] = "new";	
	  socket.emit('playerListUpdate', toSend);
	  socket.broadcast.emit('playerListUpdate', toSend);
	
	  //reset everyone's player lists
	  toSend = {};
	  toSend["players"] = players;
	  console.log(toSend);
	  socket.emit('playerListUpdate', toSend);
	  socket.broadcast.emit('playerListUpdate', toSend);
  });
  
  socket.on('startGame', function () {
	  started = true;
    console.log('I am the Start Game function!');
	  var status = {};
	  status["status"] = "start";
	  console.log(status);
	  socket.broadcast.emit('sendStatus', status);	
	
	  var trackLength = 8; //from index.html
	
	  //this is where we loop
	  var data = {};
	  //um, this number thing is wierd - make it true/false
	  var finishLine=0;
	  finished = false;
	  while (!finished)
	  {
      finishLine++;
		  for (var i = 0; i<Object.keys(players).length; i++)
			  data[Object.keys(players)[i]] = players[Object.keys(players)[i]];
		  var rnd = Math.floor(Math.random()*Object.keys(players).length);
		  players[Object.keys(data)[rnd]]++;
		  //receiveData(JSON.stringify(data));
		
		  for (var j = 0; j<Object.keys(players).length; j++)
		  {
        if (players[Object.keys(players)[j]] >= trackLength)
			  {
				  finished=true;
			  }
		  }
		  var toSend = {};
		  toSend["players"] = players;
	
		  console.log(toSend);
		  console.log(finishLine);
		  socket.emit('partialBoardUpdate', toSend);
		  socket.broadcast.emit('partialBoardUpdate', toSend);	
	  }
	  //send the final result to UI for updating
	  //socket.emit('finalBoardUpdate', players2);
	  //socket.broadcast.emit('finalBoardUpdate', players2);
  });
  
});
