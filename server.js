var express = require('express');
var path = require('path');
var pug = require('pug');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.get('/',function(req,res) {
  res.render('layout',{
    title:'Real tiem map with Nodejs',
    description:'Mi primer mapa'
  });
});

io.sockets.on('connection',function(socket) {
  console.log('user connected');

  socket.on('coords:me',function(data) {
    console.log(data);
    socket.broadcast.emit('coords:users', data);
  });

});

app.use(express.static(path.join(__dirname,'public')));

server.listen(app.get('port'),function() {
  console.log('server on port ',app.get('port'));
});
