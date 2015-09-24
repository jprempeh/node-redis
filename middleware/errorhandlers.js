exports.notFound = function notFound(req, res, next) {
	res.send(404, 'Error 404: Wrong Route');
};