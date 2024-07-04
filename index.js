const express = require('express');
// const { createServer } = require('node:http');
// const { join } = require('node:path');
const { Server } = require("socket.io");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const messages = []

io.on('connection', (socket) => {
//   const username = socket.handshake.query.username
//   console.log(username);
  socket.on('message', (data) => {
    const message = {
      message: data.message,
      usernamesend: data.usernamesend,
      sentdate: new Date()
    }
    messages.push(message)
    io.emit('message', message)
  })
});

server.listen(8891, () => {
  console.log('listening on *:3000');
});