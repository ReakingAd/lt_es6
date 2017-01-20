/*
@param cityCode [String] or [Number]
@usage  
		const Past24air = require('./weather');
		let p1          = new Past24air('101071101');
		let pPast24air  = p1.init();
@return 
		init()方法返回一个Promise对象，可继续用于外部的异步编程，例如：
		pPast24air.then( airInfo => {
			console.log( airInfo );
		});
		airInfo 是一个 JSON ，包含了过去24小时所有空气信息
			
*/
const conf    = require('../myapp/config/conf.json');
const request = require('request');
const co      = require('co');

class Past24air{
	constructor( cityCode ){
		this.cityCode = cityCode;
	}
	init(){
		let _this = this;

		return co(function* (){
			let url           = _this.getUrl();
			let interfaceDate = yield _this.getData(url);
			let airData       = yield _this.parseWeatherDate(interfaceDate);
			
			try{
				JSON.parse( airData );

				return airData;
			}
			catch(err){
				if(err) {
					return {
						status:'error',
						error:'解析数据错误,请检查参数'
					}	
				}
			}
		});
	}
	getUrl(){
		if( typeof this.cityCode === 'number' ){
			this.cityCode = this.cityCode.toString();
		}
		if( typeof this.cityCode !== 'string' ){
			throw new Error('wrong params for class Weather，string needed.');
		}
		let timeStamp = ( new Date() ).getTime();

		return 'http://d1.weather.com.cn/aqi_all/' + this.cityCode + '.html?_=' + timeStamp;
	}
	getData(url){
		let _this = this;

		return new Promise( (resolve,reject) => {
			let options = {
				url:url,
				method:'get',
				proxy:conf.proxy,
				headers:{
					'Accept':'*/*',
					'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4',
					'Connection':'keep-alive',
					'Cookie':'vjuids=-4b19084b5.1596ef43cbf.0.710c44f6b3224; BIGipServerd1src_pool=1874396221.20480.0000; Hm_lvt_080dabacb001ad3dc8b9b9049b36d43b=1483632774,1483717334,1483717371,1484056485; Hm_lpvt_080dabacb001ad3dc8b9b9049b36d43b=1484056596; vjlast=1483625217.1484056485.11; f_city=%E5%8C%97%E4%BA%AC%7C101010100%7C',
					'Host':'d1.weather.com.cn',
					'Referer':'http://www.weather.com.cn/air/?city=' + _this.cityCode,
					'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
				}
			}
			request(options,(err,res,body) => {
				if(err) console.log(err);
				resolve( body )
			});
		});
	}
	parseWeatherDate(interfaceDate){
		return new Promise( (resolve,reject) => {
			let rObj        = /(?:setAirData\()(.*?)(?:\))/g;
			let result      = rObj.exec(interfaceDate);
			let weatherJSON = result[1];

			resolve(result[1]);
		});
	}
}

module.exports = Past24air;

