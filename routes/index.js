/**
 * Routes
 */

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;

function index(req,res) {
	res.send(index);
}
