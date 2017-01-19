const express    = require('express');
const router     = express.Router();
// const user       = require('../database/db').user;

const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
const getWeather = require('./getweather');
const lt_utils   = require('../public/lt_utils.js')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login',(req,res) => {
	res.render('login',{title:'login'})
});


/* ucenter */
// router.post('/ucenter', (req, res) => {
// 	var query = {name: req.body.name, password: req.body.password};
// 	(function(){
// 		  user.count(query, function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
// 				if(doc == 1){
// 					console.log(query.name + ": 登陆成功 " + new Date());
// 					res.render('ucenter', { title:'ucenter' });
// 				}else{
// 					console.log(query.name + ": 登陆失败 " + new Date());
// 					res.redirect('/');
// 				}
// 	  	});
// 	})(query);
// });

/*
@param  
		callback [String] JSONP的回调函数
		city [String] 城市站号，见 城市站号.xls
		type [String] 1 为实时查询天气，2 为查询过去24小时控制质量。缺省为1
@return [JSON] 与type对应的气象数据
*/
router.get('/api/weather',(req,res) => {
	let params = req.query;
	let errMsg = {
		status:'error',
		desc:''
	}
	let _callbackFnName = params.callback;

	// 如果是 JSONP,即带有 callback参数
	if( typeof _callbackFnName !== 'undefined' ){
		let isLegalFuncName = lt_utils.isLegalFuncName( _callbackFnName );

		// 如果jsonp的回调函数名字非法，则以JONSP的形式返回提醒信息
		if( !isLegalFuncName ){
			res.send( '\'jsonp 回调函数名非法，请修改。\'' );
		}
		// 有 city 参数
		else if( typeof params.city !== 'undefined' ){
			let pWeather = getWeather(params);

			pWeather.then( weatherInfo => {
				let jsonpResult = _callbackFnName + '(' + weatherInfo + ')';

				res.send( jsonpResult )
			}).catch( err => {
				if(err) console.log( 'err:: ' + err);
			})
		}
		// 无 city 参数
		else{
			errMsg.desc = '缺少参数';
			errMsg = JSON.stringify( errMsg );
			let jsonpResult = _callbackFnName + '(' + errMsg + ')';

			res.send( jsonpResult );
		}
	}
	// 如果不是 JSONP
	else{
		// 有 city 参数
		if( typeof params.city !== 'undefined' ){
			let pWeather = getWeather(params);

			pWeather.then( weatherInfo => {
				// res.set('Access-Control-Allow-Origin','*');
				res.send( weatherInfo )
			}).catch( err => {
				if(err) console.log( 'err:: ' + err);
			});
		}
		// 无 city 参数
		else{
			errMsg.desc = '缺少参数';
			errMsg = JSON.stringify( errMsg );

			res.send( errMsg );
		}
	}

});
module.exports = router;
