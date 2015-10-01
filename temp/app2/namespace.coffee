io = require 'socket.io'
  .listen 4000

# Listeners

io.sockets.on 'connection', (socket) ->
  socket.username = data.username
  socket.broadcast.emit 'join', username: data.username, socket: socket.id

socket.on 'ping', () ->
  socket.broadcast.emit 'ping', username: socket.username

socket.on 'privatePing', (data) ->
  io.sockets.connected[data.socket].emit 'ping', username: socket.username, priv: true
