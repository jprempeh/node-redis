io = require('socket.io').listen(4000)

io.sockets.on 'connection', (socket) ->
  socket.on 'join', (data) ->
    io.sockets.emit 'userJoined', data
    socket.username = data.username
    socket.on 'ping', (data) ->
      io.sockets.emit 'ping', username: socket.username