// arduino.js
//=======================================================================

module.exports = function(app) {
  	var Arduino = require('../models/arduino.js');

  
  	//View - Return all Arduinos in the DB
  	function muestraTodos(req, res) {
  		Arduino.find({}, function (err, arduino) {
  			console.log('recupero: ' + arduino);
    		res.render('arduino.jade', {
      			title: 'Vista index lista de los Arduinos',
      			docs: arduino
    		});
  		});
  	};

	// view for create new Arduino
  	function formuNuevo(req, res) {
  		res.render('arduinoNew.jade', {
    		title: 'Nuevo Arduino'
  		});
  	};

  	//POST - Insert a new Tshirt in the DB
  	function creaNuevo(req, res) {
  		console.log(req.body);
    	var arduino = new Arduino({
   			nombre: 	req.body.nombre,
 			ip: 		req.body.ip,
    		mac: 		req.body.mac,
		    netmask: 	req.body.netmask,
    		gateway: 	req.body.gateway,
		    dns: 		req.body.dns,
    		uso: 		req.body.uso
    		});

	  	arduino.save(function (err) {
    		if (!err) res.redirect('/arduinos'); 
    		else res.redirect('/arduino/new');
    	});
  	};

  	//GET - Return a Tshirt with specified ID
  	function buscaUno(req, res) {
    	res.send('This is not implemented now');
  	};
  
  	//PUT - Update a register already exists
  	function modificaUno(req, res) {
    	res.send('This is not implemented now');
  	};

  	//DELETE - Delete a Tshirt with specified ID
  	function borraUno(req, res) {
    	res.send('This is not implemented now');
  	};



  	//Link routes and functions
  	app.get( '/arduinos', muestraTodos );
  	app.get( '/arduino/new', formuNuevo );
  	app.get( '/arduino/:id', buscaUno );
  	app.post( '/arduino', creaNuevo );
  	app.put( '/arduino/:id', modificaUno );
  	app.delete( '/arduino/:id', borraUno );
}