'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var proxyquire = require('proxyquire');
var expect = chai.expect;
chai.use(sinonChai);

describe('Logic/Categories', function () {
	var mongoose = require('mongoose'),
		categoryLogic,
		categoryModel,
		saveFakeMongo = sinon.stub(),
		fakeModel = {
			save: saveFakeMongo
		};

	before(function () {
		categoryModel = sinon.stub().returns(fakeModel);
		categoryLogic = proxyquire('../../.tmp/logic/categories.js', {
			mongoose: mongoose,
			'../models/category': categoryModel
		});
	});

	beforeEach('Initialize db access', function () {
		//saveFakeMongo = sinon.stub();
	});

	it('should add a new category', function (done) {
		var newCategory = { name: 'test', description: 'A dummy stuff' };
		fakeModel.save.yields(null, newCategory);

		categoryLogic.save(newCategory).then(done.bind(null, null), done);

		expect(fakeModel.save).to.have.been.called;
		expect(categoryModel).to.have.been.calledWith(newCategory);
	});

	it('should return an error if there is a category with the same name', function (done) {
		var newCategory = { name: '', description: 'A dummy stuff' };
		fakeModel.save.yields(new Error('Opps'), null);

		var promise = categoryLogic.save(newCategory);
		promise.catch(function (error) {
			done();
			expect(error).to.not.be.null;
		});
	});

	it('should return an error if the the category doesn\'t exist', function () {
		var newCategory = { name: '', description: 'A dummy stuff' },
			errorMessage = 'Category doesnt exist';

		fakeModel.save.yields(new Error(errorMessage), null);

		categoryLogic.save(newCategory).catch(function(error) {
			done();
			expect(errorMessage).to.equal(error.message);
		});
	});

	it('should not allow add category without a name', function () {

	});

	it('should validate that the name is not spaces', function () {

	});

	it('should update a category', function () {

	});

	it('should get all the categories', function () {

	});

	it('should get categories in a range', function () {

	});

	it('should get one category by his id', function () {

	});

	it('delete a category', function () {

	});
});