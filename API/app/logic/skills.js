'use strict';

'use strict';
var _ = require('lodash');
var Skill = require('../models/skill');

function save(skill) {
	var newSkill = new Skill(skill);

	return new Promise((resolve, reject) => {
		newSkill.save(commonPromiseCallback(resolve, reject));
	})
}

function update(newSkill) {
	return new Promise((resolve, reject) => {
		getById(newSkill._id)
			.then((oldSkill) => {
				_.extend(oldSkill, newSkill);
				oldSkill.save(commonPromiseCallback(resolve, reject));
			});
	})
}

function getAll() {
	return new Promise((resolve, reject) => {
		Skill.find(commonPromiseCallback(resolve, reject));
	});
}

function getById(id) {
	return new Promise((resolve, reject) => {
		Skill.findById(id, commonPromiseCallback(resolve, reject));
	});
}

function getRange() {
	//TODO: Implement.
}

function remove(id) {
	return new Promise((resolve, reject) => {
		Skill.remove({ id }, commonPromiseCallback(resolve, reject));
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