// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  var RedisStore, app, bodyParser, cookieParser, csrf, errorHandlers, express, log, partials, routes, session, util;

  express = require('express');

  app = express();

  errorHandlers = require('./middleware/errorhandlers');

  routes = require('./routes');

  log = require('./middleware/logger');

  partials = require('express-partials');

  cookieParser = require('cookie-parser');

  session = require('express-session');

  RedisStore = require('connect-redis')(session);

  bodyParser = require('body-parser');

  csrf = require('csurf');

  util = require('./middleware/utilities');

  app.set('view engine', 'ejs');

  app.set('view options', {
    defaultLayout: 'layout'
  });

  app.use(partials());

  app.use(log.logger);

  app.use(express["static"](__dirname + '/static'));

  app.use(cookieParser('secret'));

  app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    store: new RedisStore({
      url: 'redis://localhost'
    })
  }));

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(csrf());

  app.use(util.csrf);

  app.use(util.authenticated);

  app.get('/', routes.index);

  app.get('/login', routes.login);

  app.post('/login', routes.loginProcess);

  app.get('/chat', [util.requireAuthentication], routes.chat);

  app.get('/logout', routes.logOut);

  app.use(errorHandlers.error);

  app.use(errorHandlers.notFound);

  app.listen(3000);

  console.log('App running on port 3000');

}).call(this);

//# sourceMappingURL=app.js.map
