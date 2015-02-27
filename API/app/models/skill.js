'use strict';
var mongoose = require('mongoose');

var skillSchema = mongoose.Schema({
	name: String,
	description: String,
	categories: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('skillSchema', skillSchema);