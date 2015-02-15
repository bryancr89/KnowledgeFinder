'use strict';
var path = '/categories';
var routes = [];

routes.push({
	method: 'GET',
	path: path,
	handler: function (request, reply) {
		reply('Should return the list of categories');
	}
});

routes.push({
	method: 'GET',
	path: path + '/{id}',
	handler: function (request, reply) {
		reply('Should return the category based on the id');
	}
});

routes.push({
	method: 'POST',
	path: path,
	handler: function (request, reply) {
		reply('Should add the category');
	}
});

routes.push({
	method: 'PUT',
	path: path,
	handler: function (request, reply) {
		reply('Should update the category');
	}
});

routes.push({
	method: 'DELETE',
	path: path,
	handler: function (request, reply) {
		reply('Should delete the category');
	}
});

console.log('hi');

module.exports = routes;