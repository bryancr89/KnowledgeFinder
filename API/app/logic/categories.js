'use strict';

var Category = require('../models/category');

function save(category) {
	var newCategory = new Category(category);

	return new Promise((resolve, reject) => {
		newCategory.save(commonPromiseCallback(resolve, reject));
	})
}

function getById(id) {
	return new Promise((resolve, reject) => {
		Category.findById(id, commonPromiseCallback(resolve, reject));
	});
}

function getRange() {

}

function commonPromiseCallback(resolve, reject) {
	return (err, data) => {
		if (err) return reject({ message: err.message });
		resolve(data);
	}
}

module.exports = {
	save,
	getById,
	getRange
};