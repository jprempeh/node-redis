###*
# Routes
###

util = require('../middleware/utilities')

index = (req, res) ->
  res.render 'index',
    title: 'Home'
  return

login = (req, res) ->
  res.render 'login', title: 'Login'
  return

loginProcess = (req, res) ->
  isAuth = util.auth req.body.username, req.body.password, req.session
  if isAuth
    res.redirect '/chat'
  else
    res.redirect '/login'
  return

chat = (req, res) ->
  res.render 'chat', title: 'Chat'
  return

'use strict'
module.exports.index = index
module.exports.login = login
module.exports.loginProcess = loginProcess
module.exports.chat = chat
