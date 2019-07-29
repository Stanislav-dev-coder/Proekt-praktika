require('dotenv').config();

function defineServer(port) {
	return {
		name: process.env.VIRTUAL_HOST,
		script: 'server/index.js',
		env: {
			NODE_ENV: 'production',
			PORT: port,
		},
		env_production: {
			NODE_ENV: 'production',
			PORT: port,
		},
	};
}

const portsArray = process.env.PROD_PORTS.trim().split(',');
console.log('portsArray', portsArray);

module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: portsArray.map(function(port) {
		console.log('port', port);
		return defineServer(port);
	}),
};