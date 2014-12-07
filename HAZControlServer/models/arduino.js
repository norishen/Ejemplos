// arduino.js
//=======================================================================

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definición de modelos
var Arduino = new Schema({
    nombre: {type: String, require: true},
    ip: 	{type: String, require: true},
    mac: 	{type: String, require: true},
    netmask:{type: String, require: true},
    gateway:{type: String, require: true}
    });

/*
Arduino.path( 'nombre' ).validate(function (v) {
    return ((v != "") && (v != null));
});
*/

module.exports = mongoose.model('Arduino', Arduino);