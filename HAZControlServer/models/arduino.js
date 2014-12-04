// arduino.js
//=======================================================================

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definición de modelos
var Arduino = new Schema({
    nombre: {type: String},
    ip: 	{type: String},
    mac: 	{type: String},
    netmask:{type: String},
    gateway:{type: String},
    dns: 	{type: String},
    nombre: {type: String},
    ip: 	{type: String, require: true},
    mac: 	{type: String, require: true},
    netmask:{type: String, require: true},
    gateway:{type: String, require: true},
    dns: 	{type: String, require: true},
    uso:	{type: String}
    });

/*
Arduino.path( 'nombre' ).validate(function (v) {
    return ((v != "") && (v != null));
});
*/

module.exports = mongoose.model('Arduino', Arduino);