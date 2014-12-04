/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config')();

var mongoose = require('mongoose');
//var Admin = require('./controllers/Admin');
//var Home  = require('./controllers/Home');
//var Blog  = require('./controllers/Blog');
//var Page  = require('./controllers/Page');

var routes = require('./routes');
var user = require('./routes/user');


// Entorno Express
var app = express();       

// all environments
app.set('port', process.env.PORT || config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Entorno Mongoose
mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/HZControlServer', function(err){
	if (err)
		console.log('Error de conexion MongoDB"');

});

// Definición de modelos
var M_Arduino = mongoose.model('Arduino', {
    nombre: String,
    mac: String,
    netmask: String,
    gateway: String,
    dns: String,
    uso: String
    });

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/arduino', function(req, res){
  M_Arduino.find({}, function (err, docs) {
    res.render('arduino/index', {
      title: 'Vista index lista de los Arduinos',
      docs: docs
    });
  });
});

app.get('/arduino/nuevo', function(req, res){
  res.render('arduino/nuevo.jade', {
    title: 'Nuevo Arduino'
  });
});

app.post('/arduino', function(req, res){
  var arduino = new M_Arduino( req.body.nombre );

  arduino.save(function (err) {
    if (!err) res.redirect('/arduino'); 
    else res.redirect('/arduino/nuevo');
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
