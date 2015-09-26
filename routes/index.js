// Generated by CoffeeScript 1.10.0

/**
 * Routes
 */

(function () {
  var chat, index, login, loginProcess, logout, util;

  util = require('../middleware/utilities');

  index = function (req, res) {
    res.render('index', {
      title: 'Home'
    });
  };

  login = function (req, res) {
    res.render('login', {
      title: 'Login',
      message: req.flash('error')
    });
  };

  loginProcess = function (req, res) {
    var isAuth;
    isAuth = util.auth(req.body.username, req.body.password, req.session);
    if (isAuth) {
      res.redirect('/chat');
    } else {
      req.flash('error', 'Wrong Username or Password');
      res.redirect('/login');
    }
  };

  chat = function (req, res) {
    res.render('chat', {
      title: 'Chat'
    });
  };

  logout = function (req, res) {
    util.logOut(req.session);
    return res.redirect('/');
  };

  module.exports.index = index;

  module.exports.login = login;

  module.exports.loginProcess = loginProcess;

  module.exports.chat = chat;

  module.exports.logOut = logout;

}).call(this);

//# sourceMappingURL=index.js.map
