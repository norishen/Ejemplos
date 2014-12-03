var net = require('net'); 

var server = net.createServer(function(conn) { 
	console.log('conectado'); 

	// evento data
	conn.on('data', function (data) { 
		console.log(data + ' desde ' + conn.remoteAddress + ' ' + 
				conn.remotePort); 
		conn.write('Repitiendo: ' + data + " y dos huevos duros"); 
	}); 

	// evento cierre
	conn.on('close', function() { 
		console.log('Cliente cerró conexión'); 
	});

});

server.listen(8124); 

console.log('escuchando en puerto 8124'); 