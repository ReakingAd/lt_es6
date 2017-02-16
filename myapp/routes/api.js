const express           = require('express');
const router            = express.Router();
const getWeather        = require('./__api/getweather');
const lt_utils          = require('../public/lt_utils');
const getWeatherHistory = require('./__api/getweatherhistory');
const moment 		    = require('moment');
/*
@param  		{String} callback  JSONP的回调函数
@param			{String} city  城市站号，见 城市站号.xls
@param			{String} type  1 为实时查询天气，2 为查询过去24小时控制质量。缺省为1
@desc 			接收get请求，根据不同参数，返回指定的天气信息
@res.send() 	{JSON} 与type对应的气象数据
*/
router.get('/getweather',(req,res) => {
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

/*
@param 			{String} city  城市站号，见 城市站号.xls
@param   		
@desc 			返回指定城市的历史天气信息。目前仅支持北京。
*/
router.get('/getweatherhistory',(req,res) => {
	let params = req.query;
	let {city='101010100',r:range,callback} = params;
	let [startDate,endDate] = (range => {
		let startDate,endDate;
		// 由于爬虫是每天正午12:00记录数据，所以，结束日期要延后一天，才能正确取出range范围内的数据
		if(typeof range === 'undefined'){
			startDate = moment().subtract(7,'days').valueOf();
			endDate   = moment().add(1,'days').valueOf();
		}
		else{
			let rangeArr  = range.split('to');
			startDate = parseInt( moment(rangeArr[0]).valueOf() );
			endDate   = parseInt( moment(rangeArr[1]).add(1,'days').valueOf() );
		}
		return [startDate,endDate];
	})(range);
	

	getWeatherHistory.find({city:city})
	.where('createAt')
	.gt(startDate)
	.lt(endDate)
	.exec( (err,docs) => {
		if(err) return console.log( err );

		let bj_weatherJSON = JSON.stringify(docs);
		// 如果是jsonp,返回 jsonp 回调函数
		if( callback ){
			let jsonpData = callback + '(' + bj_weatherJSON + ')';

			res.send( jsonpData );
		}
		// 如果不是jsonp，直接返回数据
		else{
			res.send( bj_weatherJSON );
		}
	});
});

router.post('/test',(req,res) => {
	let queryString = req.query;
	console.log('in post');
	// console.log( res.req.body )
	console.log(req.body)
	res.send( req.body );
})
module.exports = router;

