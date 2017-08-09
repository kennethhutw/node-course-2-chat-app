const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('New user connected');

    socket.emit('newEmail',{
        from:'mike@example.com',
        text:'Hey What is going on',
        createAt:123
    });

    socket.emit('newMsg',{
        from:'John',
        text:'see you then',
        createAt:123
    });

    socket.on('createMsg',(msg)=>{
        console.log('createMsg', msg);
        io.emit('newMsg',{
            from:msg.from,
            text: msg.text,
            createAt: new Date().getTime()
        });

    });
    socket.on('createEmail', (newEmail)=>{
        console.log('createEmail', newEmail);
    });

    socket.on('disconnect',()=>{
            console.log('User was disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
});

