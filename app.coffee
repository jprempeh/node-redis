'use strict'
# Variable Declarations
express = require('express')
app = express()
errorHandlers = require('./middleware/errorhandlers')
routes = require('./routes')
log = require('./middleware/logger')
partials = require('express-partials')
cookieParser = require('cookie-parser')
session = require('express-session')
RedisStore = require('connect-redis')(session)
bodyParser = require('body-parser')
csrf = require('csurf')
util = require('./middleware/utilities')

# Templating Engine
app.set 'view engine', 'ejs'
app.set 'view options', defaultLayout: 'layout'
app.use partials()
# Logger
app.use log.logger
# Static Files
app.use express.static(__dirname + '/static')
# Middleware & Routes
app.use cookieParser('secret')
# Sessions
app.use session(
  secret: 'secret'
  saveUninitialized: true
  resave: true
  store: new RedisStore(
    url: 'redis://localhost'
  )
)
app.use bodyParser.json()
app.use bodyParser.urlencoded(extended: false)

# Adds the CSRF token to the session
app.use csrf()

# Takes CSRF token and makes it available to template
app.use util.csrf

# Authentication
app.use util.authenticated

# Routes
app.get '/', routes.index
app.get '/login', routes.login
app.post '/login', routes.loginProcess
app.get '/chat', [util.requireAuthentication], routes.chat

# Error Handlers
app.use errorHandlers.error
app.use errorHandlers.notFound

# Server Port Settings
app.listen 3000
console.log 'App running on port 3000'