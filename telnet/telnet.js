var net = require('net');

var sockets = [];

function receiveData(socket,data){
	var cleanData = cleanInput(data);
	if(cleanData == "@quit"){
		socket.end('Goodbye!\n');
	}
	else {
		for (var i = 0; i < sockets.length; i++){
			if (sockets[i] != socket) {
				sockets[i].write(data);
			}
		}
	}

}

function cleanInput(data){
	return data.toString().replace(/(\r\n|\n|\r)/gm, "");
}

function closeSocket(socket){
	var i = sockets.indexOf(socket);
	if (i != -1){
		sockets.splice(i,1);
	}
}

function newSocket(socket){
	sockets.push(socket);
	socket.write("Hello World!");
	socket.on('data', function(data){
		receiveData(socket, data);
	});
	socket.on('end', function(){
		closeSocket(socket);
	});
	console.log("get  connected");
}

// function newSocket(socket){
// 	socket.write('Hello World!');
// }

var server = net.createServer(newSocket);

server.listen(3000);