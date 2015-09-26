###*
# Routes
###
config = require('../config')
util = require('../middleware/utilities')

index = (req, res) ->
  res.render 'index',
    title: 'Home'
  return

login = (req, res) ->
  res.render 'login', title: 'Login', message: req.flash 'error'
  return

loginProcess = (req, res) ->
  isAuth = util.auth req.body.username, req.body.password, req.session
  if isAuth
    res.redirect '/chat'
  else
    req.flash 'error', 'Wrong Username or Password'
    res.redirect config.routes.login
  return

chat = (req, res) ->
  res.render 'chat', title: 'Chat'
  return

# Logout
logout = (req, res) ->
  util.logOut(req.session)
  res.redirect('/')

module.exports.index = index
module.exports.login = login
module.exports.loginProcess = loginProcess
module.exports.chat = chat
module.exports.logOut = logout