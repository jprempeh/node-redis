"use strict";
var express = require('express');
var app     = express();
var errorHandlers = require('./middleware/errorhandlers');
var routes = require('./routes');
var log = require('./middleware/logger');
var partials = require('express-partials');
var cookieParser = require('cookie-parser');

// Templating Engine
app.set('view engine', 'ejs');
app.set('view options', {defaultLayout: 'layout'});

// Logger
app.use(log.logger);

// Static Files
app.use(express.static(__dirname + '/static'));

// Middleware & Routes
app.use(cookieParser());
app.use(partials());
app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);
app.get('/chat', routes.chat);
app.get('/error', function (req, res, next) {
	next(new Error('MY bad!'));
});

// Error Handlers
app.use(errorHandlers.notFound);
app.use(errorHandlers.error);

app.listen(3000);
console.log('App running on port 3000');