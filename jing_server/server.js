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

let roles = ['x','o','observer'];
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
    socket.on('xDone',msg => {
        console.log( msg )
    });
    // ==============
    
    // 接收x的step
    socket.on('stepClient',msg => {
        socket.emit('stepServer',msg);// 回馈给step的发起者
        socket.broadcast.emit('stepServer',msg);// 推送给除step发起者外的所有客户端
    })
    // dispathRole(io,socket);
    let roles = ['x','o','observer'];
    io.clients((err,clients) => {
        console.log( clients )
        let socketID = socket.id;
        let num = clients.indexOf( socketID );
        num = num > 2 ? 2 : num;
        let roleInfo = {
            id:socketID,
            role:roles[ num ]
        }
        socket.emit('dispatchRole',roleInfo)
    })
    
});

function dispathRole(io,socket){
}