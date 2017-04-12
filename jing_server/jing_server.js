const app = require('http').createServer(handler)
const io  = require('socket.io')(app);
const fs  = require('fs');

function handler(req, res) {
	res.writeHead(200);
	res.end();
}
app.listen(8082);

io.on('connection', (socket) => {
    // 接收client的落子信息
    socket.on('stepClient',msg => {
        socket.emit('stepServer',msg);// 回馈给发起者
        socket.broadcast.emit('stepServer',msg);// 推送给除发起者外的所有客户端
    })
    // 接收client重启游戏的请求
    socket.on('restartGameClient',() => {
        socket.emit('restartGameServer');
        socket.broadcast.emit('restartGameServer');
    }) 
});