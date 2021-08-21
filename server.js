const express = require('express');
const app =express();
const fs = require('fs')
const http = require('http');
const path = require('path');
const server = http.createServer(app);

const multer = require("multer")


const {Server} = require('socket.io');
const io = new Server(server);


const PORT= process.env.PORT||3000;
app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
});
app.get('/main',(req,res)=>{
  res.sendFile(__dirname+'/public/main.html')
});
// app.get('/download',(req,res)=>{
//     res.sendFile(__dirname+'/download.html')
// });





let userList = [];

let connections = [];



io.on('connection', (socket) => {

  connections.push(socket);
  console.log("Connected:", connections.length );


socket.on('disconnect', function (data) {
  if (socket.username) {
  userList.splice(userList.indexOf(socket.username), 1);
  updateUsernames();
  }
  
  connections.splice(connections.indexOf(socket), 1);
  console.log("Disconnected:", connections.length );
  console.log(userList);
  });

  socket.on('new user', (data) => {
    socket.username = data
    userList.push(socket.username);
    console.log(userList);
    updateUsernames();
    });

    function updateUsernames() {
    io.emit('userlist', userList);
    }





































// send message
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

// typing... event
    socket.on('typing', (data)=>{
     io.emit('typing',data)
    });


//online or offline

  io.emit('on_off', {
    on_off:socket.connected,
    id:socket.id
  });
  socket.on('disconnect',()=>{
    io.emit('on_off', {on_off:socket.connected});
  })
  







  });












server.listen(PORT,()=>{
    console.log('http://localhost:'+port);
})