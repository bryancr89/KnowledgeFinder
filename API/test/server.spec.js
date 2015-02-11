'use strict';
var chai = require('chai');
var expect = chai.expect;
var server;

describe("API Server", function() {
	before(function() {
		process.env.NODE_ENV = 'development';
		server = require('../app/server.js');
	});
	it('should ', function() { expect(true).to.be.true; });
});