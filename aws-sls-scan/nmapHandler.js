const os = require('os');
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');
const publicIp = require('public-ip');
const s3Helper = require('./lib/s3');
const child_process = require('child_process');

module.exports.portscan = function (event, context, callback) {
	let nmapPath = '';

	if (process.env.IS_LOCAL) {
		nmapPath = '/usr/local/bin/nmap';
	} else {
		nmapPath = path.join(__dirname, 'tools', 'nmap')
	}

	function nmap() {
		return new Promise(function (resolve, reject) {
			child_process.execFile(nmapPath, event.args.split(' '), function (error, stdout, stderr) {
				publicIp.v4().then(function (ip) {
					let result = {};
					if (stdout) {
						result.output = stdout;
						if (ip) {
							result.ip = ip;
						}
						resolve(result);
					} else {
						result.output = stderr;
						resolve(result);
					}
				})
			});
		});
	}

	try {
		nmap().then(function (result) {
			callback(null, result);
		})
	} catch (err) {
		console.log(err)
	}
}