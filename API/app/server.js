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
server.ext('onRequest', (request, reply) => {
	var path = request.path;
	console.log(path);
	if (path.substr(-1) === '/') {
		request.setUrl(path.substring(0, path.length -1));
	}
	return reply.continue();
});

var options = {
	opsInterval: 1000,
	reporters: [{
		reporter: require('good-console'),
		args: [{ log: '*', response: '*' }]
	}, {
		reporter: require('good-file'),
		args: ['./server.log', { ops: '*' }]
	}, {
		reporter: require('good-http'),
		args: [{ error: '*' }, 'http://prod.logs:3000', {
			threshold: 20,
			wreck: {
				headers: { 'x-api-key': 12345 }
			}
		}]
	}]
};

server.register({ register: require('good'), options: options },
	(err) => {
		if (err) return console.error(err);
		server.start(() => {
			console.info('Server started at ' + server.info.uri);
		});
	}
);