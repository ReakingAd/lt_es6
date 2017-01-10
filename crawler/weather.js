const request = require('request');
const co      = require('co');
/*

*/
class Weather{
	constructor(){
		this.url = 'http://d1.weather.com.cn/sk_2d/101010100.html';
		this.data;
	}
	init(){
		let _this = this;

		return co(function* (){
			let interfaceDate = yield _this.getWeatherdata();
			let weatherData   = yield _this.parseWeatherDate(interfaceDate);
			let data          = JSON.parse( weatherData );

			return data;
		})
		.catch( err => {
			if(err){
				console.log( 'error in co catch: ' + err );
			}
		});
	}
	getWeatherdata(){
		return new Promise( (resolve,reject) => {
			let options = {
				url:this.url,
				method:'get',
				// proxy:'http://proxy.cmcc:8080',
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
				resolve( body )
			});
		});
	}
	parseWeatherDate(interfaceDate){
		return new Promise( (resolve,reject) => {
			let rObj   = /({.*?})/g;
			let result = rObj.exec(interfaceDate);

			resolve(result[1]);
		});
	}
}

let w1         = new Weather();
let pWeather   = w1.init()

module.exports = pWeather;