// datosArduino.js
//=======================================================================

module.exports = function(url) {
	var http = require('http');

	var options = {
		host: url.addr,
		port: url.port,
		path: '/'
	};

	http.get(options, function(res) {
		var body;
		console.log("Got response: " + res.statusCode);

		res.on( 'data', function(chunk) {
			body += chunk;
		}).on('end', function(){
			console.log("BODY: " + body);

		});

	}).on('error', function(err) {
		console.log('Error acceso a ' + url.addr )		
	});

};
