module.exports.csrf = (req, res, next) ->
  res.locals.token = req.csrfToken()
  next()
  return

# Authentication Methods
# Check for authentication in the session
module.exports.authenticated = (req, res, next) ->
  res.locals.isAuthenticated = req.session.isAuthenticated
  if req.session.isAuthenticated
    res.locals.user = req.session.user
  next()
  return

# Check to see if someone is authenticated
module.exports.requireAuthentication = (req, res, next) ->
  if(req.session.isAuthenticated)
    next()
    return
  else
    res.redirect '/login'
    return

module.exports.auth = (username, password, session) ->
  isAuth = username == 'joe' || username == 'migos'
  if isAuth
    session.isAuthenticated = isAuth
    session.user =
      username: username
  isAuth