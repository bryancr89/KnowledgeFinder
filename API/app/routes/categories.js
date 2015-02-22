'use strict';
var categoriesLogic = require('../logic/categories');
var path = '/categories';
var routes = [];

routes.push({
	method: 'GET',
	path: path,
	handler: (request, reply) => {
		reply('Should return a list of categories!!');
	}
});

routes.push({
	method: 'GET',
	path: path + '/{id}',
	handler: function (request, reply) {
		categoriesLogic.getById(1).then((response) => {
			reply(response);
		}, (error) => {
			reply(JSON.parse(error));
		});
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