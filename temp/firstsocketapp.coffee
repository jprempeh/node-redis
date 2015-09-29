io = require('socket.io').listen(4000)

io.sockets.on 'connection', (socket) ->
  socket.on 'join', (data) ->
    socket.broadcast.emit 'userJoined', data
    socket.username = data.username

  socket.on 'ping', (data, done) ->
      io.sockets.emit 'ping', username: socket.username
      done 'ack'

  # Disconnect Listener
  socket.on 'disconnect', () ->
    socket.broadcast.emit 'userDisconnect', username: socket.username