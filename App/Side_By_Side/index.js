const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

 /* setTimeout(()=>{
    let obj = {
      channel_name: 'Intellect Developer',
      subscribers : '2k+',
      message: 'Please like this'  
    }
    socket.emit('customEvent',{data: {obj}})
  },4000);

  socket.on('clientEvent',(data)=>{
    console.log("client data recived: ",data)
  })*/
 socket.on('send_msg',(data) =>{
    console.log("received message in server side",data)
    io.emit('recived_msg',data)
 })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});