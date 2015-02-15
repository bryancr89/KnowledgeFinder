'use strict';
function initializeEnvironmentConfigurations(env) {
	var config = {
		host: 'localhost',
		port: 8080,
		dbPath: 'mongodb://localhost/knowledge-finder',
		displayStackTrace: true
	};
	env = env && env.toLowerCase() || '';
	switch (env) {
		case 'production':
			config.displayStackTrace = false;
			break;
	}
	return config;
}

module.exports = initializeEnvironmentConfigurations(process.env.NODE_ENV);