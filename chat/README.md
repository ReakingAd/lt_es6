[http://123.57.215.5:8081](http://123.57.215.5:8081)

问题：
- 加一层反向代理的话，在socket中获取客户端地址时，总是拿到127.0.0.1。需要在apache转发请求时，把真是ip放入请求中。百度只找到Nginx的配置，还没弄明白apache怎么弄。
- 同一内网的用户，在server端获得的IP都是一样的。可以获取mac地址来区分用户？在没有账号系统的情况下。
- 每个链接都会有一个id，可以
	
		io.sockets.on('connection', function (socket) {
	  		var socketId = socket.id;
	  		var clientIp = socket.request.connection.remoteAddress;

	  		console.log(clientIp);
		});