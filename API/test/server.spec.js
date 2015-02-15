'use strict';
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var proxyquire = require('proxyquire');
var expect = chai.expect;
chai.use(sinonChai);

describe("API Server", function () {
	var config = {
			host: 'local',
			port: 123,
			dbPath: 'dummyPath'
		},
		routes = [{
			method: 'GET',
			path: 'test'
		}],
		server = {
			connection: sinon.spy(),
			start: sinon.spy(),
			route: sinon.spy()
		},
		mongoose,
		hapi;

	before('Setup Hapi Stubs', function () {
		hapi = require('hapi');
		sinon.stub(hapi, 'Server').returns(server);
	});

	before('Setup MongoDB', function () {
		mongoose = require('mongoose');
		sinon.stub(mongoose, 'connect');
	});

	before('Setup dependencies', function () {
		proxyquire('../.tmp/server.js', {
			Hapi: hapi,
			mongoose: mongoose,
			'./config': config,
			'./routes': routes
		});
	});

	it('should start the mongodb instance', function () {
		expect(mongoose.connect).to.have.been.calledWithMatch(config.dbPath);
	});

	it('should call server.connection for establish the host/port values', function () {
		expect(server.connection).to.have.been.calledWith({
			host: config.host,
			port: config.port
		});
	});

	it('should initialize the routes', function () {
		expect(server.route).to.have.been.calledWith(routes[0]);
	});

	it('should start the server', function () {
		expect(server.start).to.have.been.called;
	});
});