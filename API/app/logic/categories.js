'use strict';
var _ = require('lodash');
var Category = require('../models/category');

function save(category) {
	var newCategory = new Category(category);

	return new Promise((resolve, reject) => {
		newCategory.save(commonPromiseCallback(resolve, reject));
	})
}

function update(newCategory) {
	return new Promise((resolve, reject) => {
		getById(newCategory._id)
			.then((oldCategory) => {
				_.extend(oldCategory, newCategory);
				oldCategory.save(commonPromiseCallback(resolve, reject));
			});
	})
}

function getAll() {
	return new Promise((resolve, reject) => {
		Category.find(commonPromiseCallback(resolve, reject));
	});
}

function getById(id) {
	return new Promise((resolve, reject) => {
		Category.findById(id, commonPromiseCallback(resolve, reject));
	});
}


function getRange() {
	//TODO: Implement.
}

function remove(id) {
	return new Promise((resolve, reject) => {
		Category.remove({id}, commonPromiseCallback(resolve, reject));
	});
}

function commonPromiseCallback(resolve, reject) {
	return (error, data) => {
		if (error) return reject({ message: error.message });
		resolve(data);
	}
}

module.exports = {
	save,
	update,
	getAll,
	getById,
	getRange,
	remove
};