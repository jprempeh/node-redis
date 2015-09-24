'use strict'
express = require('express')
app = express()
errorHandlers = require('./middleware/errorhandlers')
routes = require('./routes')
log = require('./middleware/logger')
partials = require('express-partials')
cookieParser = require('cookie-parser')
session = require('express-session')
# Templating Engine
app.set 'view engine', 'ejs'
app.set 'view options', defaultLayout: 'layout'
# Logger
app.use log.logger
# Static Files
app.use express.static(__dirname + '/static')
# Middleware & Routes
app.use cookieParser()
app.use session(secret: 'r-60_0uB|~0YQ34,}nzBZn=6k7Z93j')
app.use (req, res, next) ->
  if req.session.pageCount
    req.session.pageCount++
  else
    req.session.pageCount = 1
  next()
app.use partials()
app.get '/', routes.index
app.get '/login', routes.login
app.post '/login', routes.loginProcess
app.get '/chat', routes.chat
app.get '/error', (req, res, next) ->
  next new Error('MY bad!')
  return
# Error Handlers
app.use errorHandlers.notFound
app.use errorHandlers.error
app.listen 3000
console.log 'App running on port 3000'