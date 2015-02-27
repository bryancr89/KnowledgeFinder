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
		fakeModel = {
			save: sinon.stub(),
			findById: sinon.stub()
		};

	before(function () {
		categoryModel = sinon.stub().returns(fakeModel);
		categoryLogic = proxyquire('../../.tmp/logic/categories.js', {
			mongoose: mongoose,
			'../models/category': categoryModel
		});
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
		var newCategory = { name: 'randomCategory', description: 'A dummy stuff' },
			errorMessage = 'Category doesn\'t exist';

		fakeModel.save.yields(new Error(errorMessage), null);

		categoryLogic.save(newCategory).catch(function (error) {
			expect(errorMessage).to.equal(error.message);
			done();
		});
	});

	it('should not allow add category without a name', function () {
		var newCategory = { name: 'randomCategory', description: 'A dummy stuff' },
			errorMessage = 'You must need to provide the name of the category.';

		fakeModel.save.yields(new Error(errorMessage), null);

		categoryLogic.save(newCategory).catch(function (error) {
			expect(errorMessage).to.equal(error.message);
			done();
		});
	});

	it('should validate that the name is not spaces', function (done) {
		var newCategory = { name: '  ', description: 'A dummy stuff' },
			errorMessage = 'You must need to provide the name of the category.',
			spy = sinon.spy(categoryLogic, 'cleanFields');

		fakeModel.save.yields(new Error(errorMessage), null);

		categoryLogic.save(newCategory).catch(function (error) {
			done();
			expect(errorMessage).to.equal(error.message);
			expect(spy).to.be.called;
		});
	});

	it('should return the string without trailing and leading spaces', function () {
		var category = { name: ' Hello    ' },
			result;

		result = categoryLogic.cleanFields(category);
		expect(result.name).to.be.equal('Hello');
	});

	it.only('should update a category', function (done) {
		var oldCategory = { _id: 0, name: 'Wed development' },
			newCategory = { _id: 0, name: 'Web Development', description: 'Web rocks!' };

		oldCategory.save = sinon.stub().yields(null, newCategory);
		categoryModel.findById = sinon.stub().yields(null, oldCategory);

		categoryLogic.update(newCategory).then(function (response) {
			done();
			expect(response.name).to.equal(newCategory.message);
			expect(response.description).to.not.be.undefined;
		});
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