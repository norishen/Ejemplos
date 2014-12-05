// arduino.js
//=======================================================================

module.exports = function(app) {
  	var Arduino = require('../models/arduino.js');

    //--------------------------------------------------------
    //----- Links routes ------
    //--------------------------------------------------------
  	//View - Return all Arduinos in the DB
  	function formuTodos(req, res) {
  		Arduino.find({}, function (err, arduino) {

    		res.render('arduino.jade', {
      			title: 'Lista de Arduinos',
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

    // view for create new Arduino
    function formuRescan(req, res) {
      res.render('arduinoRescan.jade', {
        title: 'Rescan Arduinos'
      });
    };
    //--------------------------------------------------------


    //--------------------------------------------------------
    //----- Links operativa ------
    //--------------------------------------------------------
    //POST - Insert a new register in the DB
    function rescanArdus(req, res) {
      console.log('rescanArdus: ' + req.body.red );

      var urlArdu = {
        addr: req.body.red,
        port: "8080"
      };

      var datosArduino = require('../datosArduino.js')(urlArdu);
      
      res.redirect('/arduinos');
    };


  	//POST - Insert a new register in the DB
  	function creaNuevo(req, res) {
  		console.log('creaNuevo: ' + req.body);

    	var arduino = new Arduino({
   			nombre: 	req.body.nombre,
 			  ip: 		  req.body.ip,
    		mac:      req.body.mac,
		    netmask: 	req.body.netmask,
    		gateway: 	req.body.gateway,
		    dns:      req.body.dns,
    		uso:      req.body.uso
    		});

	  	arduino.save(function (err) {
    		if (!err) res.redirect('/arduinos'); 
    		else res.redirect('/arduino/new');
    	});
  	};

  	//GET - Return a register with specified ID
  	function buscaUno(req, res) {
    	res.send('This is not implemented now');
  	};
  
  	//PUT - Update a register already exists
  	function modificaUno(req, res) {
    	res.send('This is not implemented now');
  	};

  	//DELETE - Delete a register with specified ID
  	function borraUno(req, res) {
    	res.send('This is not implemented now');
  	};
    //--------------------------------------------------------


  	//Link routes and functions
  	app.get( '/arduinos', formuTodos );
  	app.get( '/arduino/new', formuNuevo );
    app.get( '/arduino/rescan', formuRescan );

  	// Links operativa
    app.post( '/arduino/rescan', rescanArdus );
    app.get( '/arduino/:id', buscaUno );
    app.post( '/arduino', creaNuevo );
  	app.put( '/arduino/:id', modificaUno );
  	app.delete( '/arduino/:id', borraUno );
}
