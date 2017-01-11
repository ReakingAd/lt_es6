const express    = require('express');
const router     = express.Router();
const user       = require('../database/db').user;

const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
const Weather    = require('../../crawler/weather');
const Past24air  = require('../../crawler/past24air');
const co         = require('co');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login',(req,res) => {
	res.render('login',{title:'login'})
});

/* ucenter */
router.post('/ucenter', (req, res) => {
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
/*
@param  city [String] 城市站号，见 城市站号.xls
		type [String] 1 为实时查询天气，2 为查询过去24小时控制质量。缺省为1
@return [JSON] 与type对应的气象数据
*/
router.get('/getweather',(req,res) => {
	let params = req.query;
	let errMsg = {
		status:'error',
		desc:''
	}

	if( params ){
		let cityCode = params.city;
		let type     = params.type || '1';

		// 缺少 城市站号 返回错误信息
		if( !cityCode ){
			errMsg.desc = '缺少参数city';
			res.send( errMsg );
		}
		// 有城市站号
		else{
			// 查询 实时天气
			if( type === '1' ){
				if( cityCode ){
					let w1        = new Weather(cityCode);
					let pWeather  = w1.init();

					pWeather.then( weatherDate => {
						res.send( weatherDate );
					}).catch( err => {
						console.log( err );
					})
				}
			}
			// 查询过去 24小时空气质量
			else if ( type === '2' ){
				if( cityCode ){
					let p1        = new Past24air(cityCode);
					let pPast24air  = p1.init();

					pPast24air.then( airDate => {
						res.send( airDate );
					}).catch( err => {
						console.log( err );
						res.send( err );
					})
				}
			}
			else{
				errMsg.desc = '参数type错误';
				res.send( errMsg );
			}
		}
	}
	else{
		errMsg.desc = '缺少参数';
	}

});
module.exports = router;
