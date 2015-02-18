'use strict';

var Category = require('../models/category');

function save(category, cb) {
	var newCategory = new Category(category);
	newCategory.save(function(err, data) {
		cb(null, data);
	});
}

module.exports = {
	save: save
};