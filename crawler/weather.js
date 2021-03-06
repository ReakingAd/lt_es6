/*
@param cityCode [String] or [Number]
@usage  
		const Weather = require('./weather');
		let w1        = new Weather('101071101');
		let pWeather  = w1.init();
@return 
		init()方法返回一个Promise对象，可继续用于外部的异步编程，例如：
		pWeather.then( weatherInfo => {
			console.log( weatherInfo );
		});
		weatherInfo 是一个 JSON ，包含了所有天气信息
			{
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
			}
*/
const conf    = require('../myapp/config/conf.json');
const request = require('request');
const co      = require('co');

class Weather{
	constructor( cityCode ){
		this.cityCode = cityCode;
	}
	init(){
		let _this = this;

		return co(function* (){
			let url           = _this.getUrl();
			let interfaceDate = yield _this.getWeatherdata(url);
			let weatherData   = yield _this.parseWeatherDate(interfaceDate);

			try{
				JSON.parse( weatherData );

				return weatherData;
			}
			catch(err){
				if(err) {
					return {
						status:'error',
						error:'解析数据错误,请检查参数'
					}	
				}
			}

		})
	}
	getUrl(){
		if( typeof this.cityCode === 'number' ){
			this.cityCode = this.cityCode.toString();
		}
		if( typeof this.cityCode !== 'string' ){
			throw new Error('wrong params for class Weather，string needed.');
		}
		return 'http://d1.weather.com.cn/sk_2d/' + this.cityCode + '.html'
	}
	getWeatherdata(url){
		return new Promise( (resolve,reject) => {
			let options = {
				url:url,
				method:'get',
				proxy:conf.proxy,
				headers:{
					'Accept':'*/*',
					// 'Accept-Encoding':'gzip, deflate, sdch',   // Accept-Encoding 指定客户端可以接收的文件的压缩方式，目前知道gzip，deflate这两种是不能再nodejs爬虫脚本用的。或者直接不指定这个字段（是不是就不压缩了？）就不会产生返回数据乱码的问题。
					'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4',
					'Cache-Control':'no-cache',
					'Cookie':'vjuids=318ff62d1.1596d43a84d.0.e67bf43dd82a4; f_city=%E5%8C%97%E4%BA%AC%7C101010100%7C; Hm_lvt_080dabacb001ad3dc8b9b9049b36d43b,=1483596868,1483599279,1483686077,1483926173; Hm_lpvt_080dabacb001ad3dc8b9b9049b36d43b=1483926173; BIGipServerd1src_pool=1874396221.20480.0000; returnUrl=http%3A%2F%2Fwww.weatherdt.com%2FuserManager%2Fperson.html; userInfo=%7B%22createTime%22%3A1483627953000%2C%22email%22%3A%22reakingad%40reakingad.com%22%2C%22expiry%22%3A1483979005552%2C%22nickName%22%3A%22%22%2C%22uId%22%3A%221483627953363084%22%2C%22userName%22%3A%22euser_1483627953237264%22%7D; accessToken=OFACEQ4EBhZ0CAMBAk5ZURhHXltSXxVEWVxcDFEQCwcMHgJXSwEDDhkdGwkEJzITBgoOGx1HAApKQxsFRwxWDREVD1IOS1ZdFEtGX1FcQhBYXEZUQ1AaHA0ODRMMBklfUFEMQxstRFZSRxFAUFpTVBdOXF9fFkBFXlJHXgIYGhYUIRMZEExfYRcUEA4XLUIUWV1SEkNRUBNGW15XUBRVFA%3D%3D; __asc=e1dcfc5e159819786634109f822; __auc=1aa351131596d6522afa84a1f65; vjlast=1483596868.1483926173.11',
					'Host':'d1.weather.com.cn',
					'Pragma':'no-cache',
					'Proxy-Connection':'keep-alive',
					'Referer':'http://e.weather.com.cn/d/air/101010100.shtml',
					'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
				}
			};
			request(options,(err,res,body) => {
				if(err) return console.log( '访问天气数据接口输错： ' + err );
				if( body ){
					resolve( body )
				}
				else{
					reject('获取html为空');
				}
			});
		});
	}
	parseWeatherDate(interfaceDate){
		return new Promise( (resolve,reject) => {
			let rObj   = /({.*?})/g;
			let result = rObj.exec(interfaceDate);
			let weatherJSON = result[1];
			
			resolve(result[1]);
		});
	}
}

module.exports = Weather;