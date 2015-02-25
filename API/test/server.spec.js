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
		hapiServer,
		server,
		mongoose,
		hapi,
		hapiSandbox;

	before('Setup MongoDB', function SetupMongo() {
		mongoose = require('mongoose');
		sinon.stub(mongoose, 'connect');
	});

	beforeEach('Setup Hapi Stubs', function SetupHapi() {
		hapi = require('hapi');
		hapiServer = {
			connection: sinon.spy(),
			start: sinon.spy(),
			route: sinon.spy(),
			register: sinon.stub(),
			ext: sinon.spy()
		};
		hapiSandbox = sinon.stub(hapi, 'Server').returns(hapiServer);
	});

	beforeEach('Setup dependencies', function SetupDependencies() {
		server = proxyquire('../.tmp/server.js', {
			Hapi: hapi,
			mongoose: mongoose,
			'./config': config,
			'./routes': routes,
			good: require('good'),
			'good-console': require('good-console')
		});
	});

	afterEach('Clean Hapi Stubs', function clenaHapiServer() {
		hapiSandbox.restore();
		hapiServer = null;
	});

	it('should start the mongodb instance', function () {
		expect(mongoose.connect).to.have.been.calledWithMatch(config.dbPath);
	});

	it('should call server.connection for establish the host/port values', function () {
		expect(hapiServer.connection).to.have.been.calledWith({
			host: config.host,
			port: config.port
		});
	});

	it('should initialize the routes', function () {
		expect(hapiServer.route).to.have.been.calledWith(routes[0]);
	});

	it('should start the server', function () {
		hapiServer.register = sinon.stub().yields(null);
		server.start();
		expect(hapiServer.start).to.have.been.called;
	});

	it('should not start the server if something goes wrong', function () {
		hapiServer.register.yields(new Error());
		server.start();
		expect(hapiServer.start).to.not.been.called;
	});
});