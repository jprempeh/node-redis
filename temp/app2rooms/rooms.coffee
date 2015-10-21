io = require 'socket.io'
  .listen 4000

# Listeners
# python -m SimpleHTTPServer

io.sockets.on 'connection', (socket) ->
  socket.on 'join', (data) ->
    socket.username = data.username
    socket.join data.room
    socket.broadcast.to(data.room).emit 'join', username: data.username, socket: socket.id, room: data.room

  socket.on 'ping', (data) ->
    socket.broadcast.to(data.room).emit 'ping', username: socket.username, room: data.room

  socket.on 'privatePing', (data) ->
    io.sockets.connected[data.socket].emit 'ping', username: socket.username, priv: true, room: data.room
