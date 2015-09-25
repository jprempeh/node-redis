###*
# Routes
###

index = (req, res) ->
  res.render 'index',
    title: 'Home'
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
