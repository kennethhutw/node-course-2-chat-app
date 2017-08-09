 var socket = io();

            socket.on('connect',function(){
                console.log('Connected to server');

                socket.emit('createEmail',{
                    to:'jen@example.com',
                    text:'Hey This is Kenneth'
                });

                socket.emit('createMsg',{
                    from:'Kenneth',
                    text:'Hey That works for me'
                });
            });
            socket.on('disconnect',function(){
                console.log('Disconnected from server');
            });

socket.on('newEmail', function(email){
    console.log('New Email',email);
});

socket.on('newMsg', function(msg){
    console.log('newMsg', msg);
});