// app.js
//=======================================================================

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config')();

var mongoose = require('mongoose');

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

var routes = require('./routes/arduino')(app);

// Entorno Mongoose
mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/HAZControlServer', function(err){
	if (err) {
		console.log('Error de conexion MongoDB' + err );
  } else {
    console.log('Connected to Database');
  }
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
