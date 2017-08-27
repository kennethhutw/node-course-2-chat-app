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

socket.on('newLocationMsg', function(msg){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>')
    li.text(`${msg.from} : `);
    a.attr('href', msg.url);
    li.append(a);
    jQuery('#Msgs').append(li);
});

socket.on('newMsg', function(msg){
    var li = jQuery('<li></li>');
    console.log
    li.text(`${msg.from} : ${msg.text}`);
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

 var locationBtn = jQuery('#send-location');

 locationBtn.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocaiton is not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function(position){
       console.log(position);
       socket.emit('createLocationMsg',{
          latitude:position.coords.latitude,
          longitude: position.coords.longitude
       });
    }, function(){
        alert('Unable to fetch location.');
    })
 });