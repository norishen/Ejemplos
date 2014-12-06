// datosArduino.js
//=======================================================================

module.exports = {

	datos: function(options) {
		var http = require('http');
		console.log("entro: " + options.host);

		http.get(options, function(res) {
			var body = "";
			console.log("Got response: " + res.statusCode);

			res.on( 'data', function(chunk) {
				body += chunk;
			}).on('end', function(){
				var response = JSON.parse(body);

			//-------------------------------------------------------
			// Tengo que implementar una llamada POST para el insert
			//-------------------------------------------------------
			});

		}).on('error', function(err) {
			console.log('Error acceso a ' + options.host);
		});
	},

	conversion: function() {
		var uno = "";
	}
};
