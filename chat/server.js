var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8081);

function handler (req, res) {
	fs.readFile(__dirname + '/index.html',
		function (err, data) {
		if (err) {
		  res.writeHead(500);
		  return res.end('Error loading index.html');
		}

		res.writeHead(200,{'Content-Type':'text/html'});
		res.end(data);
	});
}

function getIP(socket){
	let ip = socket.conn.remoteAddress;
	console.log('in getIp:' + ip)
	if( ip.indexOf('ff') ){
		ip = ip.substr(7);
	}
	else{
		ip = '127.0.0.1';
	}
	return ip;
}
function packageMsg(socket,str){
	let ip = getIP(socket);
	let data = {
		user:ip,
		msg:str
	};
	return data;
}
io.on('connection', function (socket) {
	socket.broadcast.emit('notice',packageMsg(socket,''));
	socket.emit('welcome',packageMsg(socket,'欢迎来到桃花岛...') );
	socket.on('submit',data => {
		socket.emit('publish',packageMsg(socket,data) );
		socket.broadcast.emit('publish',packageMsg(socket,data) );
	})
});
