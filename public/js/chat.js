 var socket = io();

 function scrollToBottom() {
     // selector
     var msg = jQuery('#Msgs');
     var newMsg = msg.children('li:last-child');
     // heights
     var clientHeight = msg.prop('clientHeight');
     var scrollTop = msg.prop('scrollTop');
     var scrollHeight = msg.prop('scrollHeight');
     var newMsgHeight = newMsg.innerHeight();
     var lastMsgHeight = newMsg.prev().innerHeight();

     if (clientHeight + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight) {
         console.log('should scroll');
         msg.scrollTop(scrollHeight);
     }
 };
 socket.on('connect', function () {
     console.log('Connected to server');
     var params = jQuery.deparam(window.location.search);
     socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href='./';
        }else
        {

            console.log('No Error');
        }

     });

     socket.emit('createEmail', {
         to: 'jen@example.com',
         text: 'Hey This is Kenneth'
     });

     socket.emit('createMsg', {
         from: 'Kenneth',
         text: 'Hey That works for me'
     }, function (data) {
         console.log('Got it', data);
     });
 });
 socket.on('disconnect', function () {
     console.log('Disconnected from server');
 });

 socket.on('updateUserList', function(users){
    console.log('Users List', users); 
    var ol =jQuery('<ol></ol>');

    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
 });

 socket.on('newEmail', function (email) {
     console.log('New Email', email);
 });

 socket.on('newLocationMsg', function (msg) {
     var formattedTime = moment(msg.createdAt).format('h:mm a');
     var template = jQuery('#location-template').html();
     var html = Mustache.render(template, {
         from: msg.from,
         time: formattedTime,
         location: msg.url
     });
     jQuery('#Msgs').append(html);
     scrollToBottom();
     // var li = jQuery('<li></li>');
     // var a = jQuery('<a target="_blank">My current location</a>');


     // li.text(`  ${msg.from} ${formattedTime} : `);
     // a.attr('href', msg.url);
     // li.append(a);
     // jQuery('#Msgs').append(li);
 });

 socket.on('newMsg', function (msg) {
     var formattedTime = moment(msg.createdAt).format('h:mm a');
     var template = jQuery('#msg-template').html();
     var html = Mustache.render(template, {
         from: msg.from,
         time: formattedTime,
         text: msg.text
     });
     jQuery('#Msgs').append(html);
     scrollToBottom();
     // var formattedTime = moment(msg.createdAt).format('h:mm a');
     // var li = jQuery('<li></li>');

     // li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
     // jQuery('#Msgs').append(li);
 });

 socket.on('createMsg', function (msg) {
     var formattedTime = moment(msg.createdAt).format('h:mm a');
     var template = jQuery('#msg-template').html();
     var html = Mustache.render(template, {
         from: msg.from,
         time: formattedTime,
         text: msg.text
     });
     jQuery('#Msgs').append(html);
     //  var formattedTime = moment(msg.createdAt).format('h:mm a');
     //     var li = jQuery('<li></li>');
     //     li.text(`${msg.from} ${formattedTime}: ${msg.text}`);

     //     jQuery('#Msgs').append(li);
 });
 //  socket.emit('createMsg', {
 //   from: 'Frank',
 //    text: 'Hi'
 //  }, function (data) {
 //    console.log('Got it', data);
 //  });

 jQuery('#msg-form').on('submit', function (e) {
     e.preventDefault();
     var msgTextBox = jQuery('[name=msg]');
     socket.emit('createMsg', {
         from: 'user',
         text: msgTextBox.val()
     }, function () {
         msgTextBox.val('')
     });
 });

 var locationBtn = jQuery('#send-location');

 locationBtn.on('click', function () {
     if (!navigator.geolocation) {
         return alert('Geolocaiton is not supported by your browser.');
     }

     locationBtn.attr('disabled', 'disabled').text('Sending location...');

     navigator.geolocation.getCurrentPosition(function (position) {
         console.log(position);
         locationBtn.removeAttr('disabled').text('Send location');
         socket.emit('createLocationMsg', {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude
         });
     }, function () {
         locationBtn.removeAttr('disabled').text('Send location');;
         alert('Unable to fetch location.');
     })
 });