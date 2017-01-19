const express    = require('express');
const router     = express.Router();
const user       = require('../database/db').user;

const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
const getWeather = require('./getweather');

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
router.get('/api/weather',(req,res) => {
	let params = req.query;
	let errMsg = {
		status:'error',
		desc:''
	}

	if( params ){
		let pResult = getWeather(params);

		pResult.then( weatherInfo => {
			// res.set('Access-Control-Allow-Origin','http://10.2.48.3:1130');
			res.send( weatherInfo )
		}).catch( err => {
			if(err) console.log( 'err:: ' + err);
		})

	}
	else{
		errMsg.desc = '缺少参数';
	}

});
module.exports = router;
