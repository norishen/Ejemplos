// arduino.js
//=======================================================================

module.exports = function(app) {
  	var Arduino = require('../models/arduino.js');

    //--------------------------------------------------------
    //----- Links routes ------
    //--------------------------------------------------------
  	//View - Return all Arduinos in the DB
  	show_index = function(req, res) {
  		Arduino.find({}, function (err, arduino) {

    		res.render('arduino.jade', {
      			title: 'Lista de Arduinos',
      			docs: arduino
    		});
  		});
  	};

    // view for create new Arduino
    show_rescan = function(req, res) {
      res.render('arduinoRescan.jade', {
        title: 'Rescan Arduinos'
      });
    };

    // view for create new Arduino
    show_new = function(req, res) {
      res.render('arduinoNew.jade', {
        title: 'Nuevo Arduino'
      });
    };

    // view for create new Arduino
    show_edit = function(req, res) {
      Arduino.findById(req.params.id, function (err, arduino) {
        res.render('arduinoEdit.jade', {
            title: 'Editar Arduino',
            arduino: arduino
        });
      });
    };

    show_del = function(req, res) {
      Arduino.findById(req.params.id, function (err, arduino) {
        res.render('arduinoDel.jade', {
            title: 'Borrar Arduino',
            arduino: arduino
        });
      });
    };


    //--------------------------------------------------------
    //POST - Insert a new register in the DB
    function grabaArdu(options) {

      var http = require('http');
      http.get(options, function(res) {
        var body = "";
  
        res.on( 'data', function(chunk) {
          body += chunk;
        }).on('end', function(){
          var r = JSON.parse(body);

          var ip = r.ip[0]+"."+r.ip[1]+"."
                  +r.ip[2]+"."+r.ip[3];

          var mac = r.mac[0].toString(16).toUpperCase()+":"
                  +r.mac[1].toString(16).toUpperCase()+":"
                  +r.mac[2].toString(16).toUpperCase()+":"
                  +r.mac[3].toString(16).toUpperCase()+":"
                  +r.mac[4].toString(16).toUpperCase()+":"
                  +r.mac[5].toString(16).toUpperCase();

          var nm = r.netmask[0]+"."+r.netmask[1]+"."
                  +r.netmask[2]+"."+r.netmask[3];

          var gw = r.gateway[0]+"."+r.gateway[1]+"."
                  +r.gateway[2]+"."+r.gateway[3];

          console.log("mac:"+mac+" ip:"+ip+" nm:"+nm+" gw:"+gw);

          var arduino = new Arduino({
            nombre:   r.nombre,
            ip:       ip,
            mac:      mac,
            netmask:  nm,
            gateway:  gw
            });

          arduino.save(function (err) {
            if (err) 
              console.log("No grabo nada");
          });

        });

      }).on('error', function(err) {
        console.log('Error acceso a ' + options.host);
      });
    };


    //--------------------------------------------------------
    //----- Links operativa ------
    //--------------------------------------------------------
    //POST - Insert a new register in the DB
    function rescanArdus(req, res) {
      console.log('rescanArdus: ' + req.body.red );

      var options = {
        host: req.body.red,
        port: "80",
        path: "/?func=config"
      };

      grabaArdu(options);

      res.redirect('/arduinos');
    };


    //===============================================================
    //===============================================================
    //===============================================================
    // Tengo que hacer un solo POST para las grabaciones RESTfull
    // Una sola funcion que grabe el arduino o lo modifique
    //===============================================================
    //===============================================================
    //===============================================================



  	//POST - Insert a new register in the DB
  	function creaNuevo(req, res) {
  		console.log('creaNuevo: ' + req.body);

    	var arduino = new Arduino({
   			nombre: 	req.body.nombre,
 			  ip: 		  req.body.ip,
    		mac:      req.body.mac,
		    netmask: 	req.body.netmask,
    		gateway: 	req.body.gateway
    		});

	  	arduino.save(function (err) {
    		if (!err) res.redirect('/arduinos'); 
    		else res.redirect('/arduino/new');
    	});
  	};

  	//PUT - Update a register already exists
  	function modificaUno(req, res) {
    	res.send('Edit: This is not implemented now');
  	};

  	//DELETE - Delete a register with specified ID
  	function borraUno(req, res) {
      Arduino.findById(req.params.id, function (err, arduino) {
        if (err) {
          console.log('Error bucando Arduino a borrar, cod;'+ err);
        }

        if (!arduino) {
          return res.send('Invalid ID. (De algún otro lado la sacaste tú...)')
        }

        // Tenemos el producto, eliminemoslo
        arduino.remove( function(err) {
          if (err) {    
            console.log(err)
            return next(err)
          }
          res.redirect('/arduinos');
        });

      });
  	};
    //--------------------------------------------------------


  	//Link routes and functions
  	app.get( '/arduinos', show_index );
  	app.get( '/arduino/new', show_new );
    app.get( '/arduino/rescan', show_rescan );
    app.get( '/arduino/:id/edit', show_edit );
    app.get( '/arduino/:id/del', show_del );

  	// Links operativa
    app.post( '/arduino/new', creaNuevo );
    app.post( '/arduino/rescan', rescanArdus );
  	app.put( '/arduino/:id', modificaUno );
  	app.delete( '/arduino/:id', borraUno );
}
