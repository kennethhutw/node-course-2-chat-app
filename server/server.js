const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');

const {
    generateMsg,
    generateLocationMsg
} = require('./utils/message');
const { isRealString} = require('./utils/validation');
const { Users} = require('./utils/user');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newEmail',{
    //     from:'mike@example.com',
    //     text:'Hey What is going on',
    //     createAt:123
    // });
    socket.emit('newMessage', generateMsg('Admin', 'Welcome to the chat app'));
    // socket.emit('newMsg',{
    //     from:'John',
    //     text:'see you then',
    //     createAt:123
    // });
    socket.emit('newMessage', generateMsg('Admin', 'New user joined'));

    socket.on('join',(params, callback)=>{
         if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.');
         }

         socket.join(params.room);
         // socket.leave('the Office Fans');

         //io.emit -> io.to('the Office Fans').emit
         //socket.broadcast.emit -> socket.broadcast.to('the Office Fans').emit
         //socket.emit
         users.removeUser(socket.id);
         users.addUser(socket.id,params.name, params.room);


         io.to(params.room).emit('updateUserList', users.getUserList(params.room));
         socket.emit('newMsg', generateMsg('Admin', 'Welcome to the chat app'));
         socket.broadcast.to(params.room)
            .emit('newMsg', generateMsg('Admin', `${params.name} has joined.`));

         callback();
    });


    socket.on('createMsg', (msg, callback) => {
        console.log('createMsg', msg);

        // io.emit('newMsg',{
        //     from:msg.from,
        //     text: msg.text,
        //     createAt: new Date().getTime()
        // });
        io.emit('newMsg', generateMsg(msg.from, msg.text));
        if (callback)
            callback();
        // io.emit('newMsg',{
        //      from:'admin',
        //      text: 'welcome to the chat room',
        //      createAt: new Date().getTime()
        //  });

        socket.broadcast.emit('newMsg', {
            from: 'admin',
            text: 'New user joined',
            createAt: new Date().getTime()
        });

        socket.broadcast.emit('newMsg', {
            from: msg.from,
            text: msg.text,
            createAt: new Date().getTime()
        });
    });

    socket.on('createLocationMsg', (coords) => {
        console.log('createLocationMsg', coords);
        io.emit('newLocationMsg', generateLocationMsg('Admin', coords.latitude, coords.longitude))
    });
    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMsg', generateMsg('admin',`${user.name} has left.`));
        }
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});