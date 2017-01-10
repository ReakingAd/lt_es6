var express = require('express');
var router = express.Router();
var user = require('../database/db').user;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',(req,res) => {
	res.render('login',{title:'login'})
});

/* ucenter */
router.post('/ucenter', function(req, res) {
	var query = {name: req.body.name, password: req.body.password};
	(function(){
		  user.count(query, function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
				if(doc == 1){
					console.log(query.name + ": 登陆成功 " + new Date());
					res.render('ucenter', { title:'ucenter' });
				}else{
					console.log(query.name + ": 登陆失败 " + new Date());
					res.redirect('/');
				}
	  	});
	})(query);
});

router.get('/weather',function(req,res){
	// res.send( 'mongoose' )
	let db = mongoose.createConnection('mongodb://localhost/weather');

	db.on('error', err => {
		console.log('链接数据库输错： ' + err);
	});

	db.on('open',callback => {
		let weatherSchema = mongoose.Schema({
			nameen:String,      // 城市-英文
			cityname:String,	// 城市-中文
			city:String,		// 城市-编码
			temp:String,		// 温度-摄氏度 
			tempf:String,		// 温度-华氏度  f=fahrenheit  飞轮海
			WD:String,			// 风向-中文   wd=wind directory
			wde:String,			// 风向-英文
			WS:String,			// 风速-中文   ws=wind speed
			wse:String,			// 风速-英文
			SD:String,			// 相对湿度
			time:String,		// 时间
			weather:String,		// 天气-中文
			weathere:String,	// 天气-英文
			weathercode:String, // 天气-代码
			qy:String,			// 
			njd:String,
			sd:String,
			rain:String,
			rain24h:String,
			aqi:String,			// 空气质量指数 aqi=air quantity index
			limitnumber:String, 
			aqi_pm25:String,	// pm2.5指数  
			date:String,		// 日期
		});
		let weatherModel = db.model('weather',weatherSchema);
		
		weatherModel.find( (err,weather) => {
			res.send( weather );
		});
	});
});
module.exports = router;
