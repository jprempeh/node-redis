"use strict";
exports.notFound = function notFound(req, res, next) {
	res.send(404, 'Error 404: Wrong Route');
};

exports.error = function error(err, req, res, next) {
	console.log(err);
	res.send(500, 'Error with the app');
};