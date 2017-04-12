var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8082);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
    // 接收client的落子信息
    socket.on('stepClient',msg => {
        socket.emit('stepServer',msg);// 回馈给step的发起者
        socket.broadcast.emit('stepServer',msg);// 推送给除step发起者外的所有客户端
    })
    // 接收client重启游戏的请求
    socket.on('restartGameClient',() => {
        socket.emit('restartGameServer');
        socket.broadcast.emit('restartGameServer');
    })
    
});