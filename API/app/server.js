/**
 * Created by bryan on 2/9/15.
 */
'use strict';
var Hapi = require('hapi');
var environment = process.env.NODE_ENV;
var config = require('./config/' + environment);

var server = new Hapi.Server();
server.connection({
	host: config.host,
	port: config.port
});

server.route({
	method: 'GET',
	path:'/hello',
	handler: function (request, reply) {
		reply('hello world');
	}
});

let x = 10;
console.log(x);
server.start();
console.log('Server listen on port:', config.port);