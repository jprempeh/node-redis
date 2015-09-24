###*
# Routes
###

index = (req, res) ->
  res.clearCookie 'Index Cookie'
  res.render 'index',
    layout: 'layout'
    title: 'Home'
    cookie: JSON.stringify(req.cookies)
    session: JSON.stringify(req.session)
  return

login = (req, res) ->
  res.render 'login', title: 'Login'
  return

loginProcess = (req, res) ->
  res.redirect '/'
  return

chat = (req, res) ->
  res.render 'chat', title: 'Chat'
  return

'use strict'
module.exports.index = index
module.exports.login = login
module.exports.loginProcess = loginProcess
module.exports.chat = chat
