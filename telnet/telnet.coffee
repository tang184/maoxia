net = require 'net'
chalk = require 'chalk'

sockets = []

receiveData = (socket,data) ->
  cleanData = cleanInput data
  if cleanData is '@quit'
    socket.end chalk.cyan 'Goodbye!\n'
  else
    for socket in sockets
      socket.write data

cleanInput = (data) ->
  data.toString().replace /(\r\n|\n|\r)/gm, ''

closeSocket = (socket) ->
  i = sockets.indexOf socket
  if i != -1
    socket.splice i, 1

newSocket = (socket) ->
  sockets.push socket
  socket.write chalk.green 'Hello World!'
  socket.on 'data', (data) ->
    receiveData socket, data
  socket.on 'end', ->
    closeSocket socket

  console.log chalk.yellow 'get connected!'

server = net.createServer(newSocket)

server.listen 3000

##GULP
