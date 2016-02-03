let babel = require('babel-core');
let fs = require('fs');
let async = require('async');
let path = require('path');
let files = [
	'index.js'
];

async.each(
	files,
	convertFile,
	function(err) {
		console.log('finished', err);
	}
);


function convertFile(filepath, cb) {
	let options = {presets: ['es2015']};
	babel.transformFile(path.join(__dirname, '../', filepath), options, function(err, result) {
		if(err) return cb(err);
		fs.writeFile(path.join(__dirname, '../dist', filepath), result.code, cb);
	});
}