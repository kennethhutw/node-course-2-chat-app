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
                 }, function (data) {
   console.log('Got it', data);
});
            });
            socket.on('disconnect',function(){
                console.log('Disconnected from server');
            });

socket.on('newEmail', function(email){
    console.log('New Email',email);
});

socket.on('newMsg', function(msg){
    console.log('newMsgggggggg', msg);
    var li = jQuery('<li></li>');
    console.log
    li.text(`${msg.from} : ${msg.text}`);
console.log('Got1111111 it' + li.val());
    jQuery('#Msgs').append(li);
});

socket.on('createMsg', function(msg){

    var li = jQuery('<li></li>');
    li.text(`${msg.from} : ${msg.text}`);

    jQuery('#Msgs').append(li);
});
//  socket.emit('createMsg', {
//   from: 'Frank',
//    text: 'Hi'
//  }, function (data) {
//    console.log('Got it', data);
//  });

 jQuery('#msg-form').on('submit', function(e){
     e.preventDefault();
     socket.emit('createMsg',{
         from:'user',
         text:jQuery('[name=msg]').val()
     }, function(){

     });
 });