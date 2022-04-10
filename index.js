const express=require('express');
const app=express();
const http=require('http');
const { disconnect } = require('process');
const server=http.createServer(app);
const {Server}=require("socket.io")
const io=new Server(server)
const moment=require('moment')


app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
console.log('a user connected');
socket.on('disconnect',() => {
  console.log('user disconnected');
});

socket.on('chat-message-receive', (user,msg) => {
    var timestamp=moment().format("DD-MM-YYYY HH:mm")
    socket.broadcast.emit('chat-message-send',user,msg,timestamp);
    socket.emit('chat-message-send',"Me",msg,timestamp);
    console.log('message: ' + msg);
});

});

server.listen(3000,() => {
    console.log('Listening on *: 3000');
});
