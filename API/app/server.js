'use strict';
var Hapi = require('hapi');
var mongoose = require('mongoose');
var config = require('./config');
var routes = require('./routes');

var server = new Hapi.Server();
var db = mongoose.connection;

mongoose.connect(config.dbPath);
server.connection({ host: config.host, port: config.port });
routes.forEach(route => server.route(route));
server.start();

console.log('Server listen on port:', config.port);