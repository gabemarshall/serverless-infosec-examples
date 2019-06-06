const os = require('os');
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');
const child_process = require('child_process');
const argv = require('yargs').argv;
const bucketName = process.env['BUCKET'];
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const s3Helper = require('./lib/s3');
const publicIp = require('public-ip');

let event, gobusterPath, wordlistsPath, debug;
module.exports.gobusterHttp = function (event, context, callback) {

	function setDebug() {
		debug = true;
		event = {};
		event.args = args;
		callback = console.log;
		gobusterPath = '/usr/local/bin/gobuster';
		wordlistsPath = path.join(__dirname, 'wordlists', 'wordlists/');
	}

	let gobusterPath = '';
	if (!event) {
		setDebug();
	}

	if (process.env.IS_LOCAL || debug) {
		setDebug();
	} else {
		gobusterPath = path.join(__dirname, 'tools', 'gobuster')
		wordlistsPath = path.join(__dirname, 'wordlists', 'default.txt')
	}

	function gobuster() {
		return new Promise(function (resolve, reject) {
			child_process.execFile(gobusterPath, event.args.split(' '), function (error, stdout, stderr) {
				if (stdout) {
					resolve(stdout);
				} else {
					resolve(stderr);
				}
			});
		});
	}

	try {
		s3Helper.download({ Bucket: bucketName, Key: event.wordlist }).then(function () {
			gobuster().then(function (stdout) {
				// Delete the temporary file used for storing the gobuster wordlist
				s3Helper.delete({ Bucket: bucketName, Key: event.wordlist })
				let resOutFile;
				try { resOutFile = fs.readFileSync('/tmp/' + event.output) } catch (err) { };
				// If the results were saved locally, upload them to s3
				let result = {

				}
				result.output = stdout;
				publicIp.v4().then(function (ip) {
					if (ip) {
						result.ip = ip;
					}
					if (resOutFile) {
						let tmpParams = { Bucket: bucketName, Key: 'temp-gobuster-output.log', Body: resOutFile };
						s3Helper.put(tmpParams).then(function () {
							callback(null, result);
						})
					} else {
						callback(null, result);
					}
				})
			})
		})
	} catch (err) {
		console.log(err)
	}
}