'use strict';
var categoriesLogic = require('../logic/categories');
var path = '/categories';
var routes = [];

routes.push({
	method: 'GET',
	path: path,
	handler: (request, reply) => {
		categoriesLogic.getAll()
			.then((response) => {
				reply(response);
			})
			.catch((error) => {
				console.log(error);
				reply(error.message);
			});
	}
});

routes.push({
	method: 'GET',
	path: path + '/{id}',
	handler: (request, reply) => {
		var promise = categoriesLogic.getById(request.params.id);
		commonHandlePromise(promise, reply);
	}
});

routes.push({
	method: 'POST',
	path: path,
	handler: function (request, reply) {
		var promise = categoriesLogic.save(request.payload);
		commonHandlePromise(promise, reply);
	}
});

routes.push({
	method: 'PUT',
	path: path,
	handler: function (request, reply) {
		var promise = categoriesLogic.update(request.payload);
		commonHandlePromise(promise, reply);
	}
});

routes.push({
	method: 'DELETE',
	path: path,
	handler: function (request, reply) {
		var promise = categoriesLogic.remove(request.paramas.id);
		commonHandlePromise(promise, reply);
	}
});

function commonHandlePromise(promise, reply) {
	promise
		.then((response) => {
			reply(response);
		})
		.catch((error) => {
			console.log(error);
			reply(error.message);
		});
}

module.exports = routes;