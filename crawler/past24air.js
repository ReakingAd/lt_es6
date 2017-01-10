const request = require('request');
const co = require('co');

class Past24air{
	constructor(){
		this.url = 'http://d1.weather.com.cn/aqi_all/101010100.html?_=1484057468243';
	}
	init(){
		let _this = this;

		return co(function* (){
			let data = yield _this.getData();
			
			return data;
		});
	}
	getData(){
		let options = {
			url:'http://d1.weather.com.cn/aqi_all/101010100.html?_=1484057468243',
			method:'get',
			headers:{
				'Accept':'*/*',
				'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4',
				'Connection':'keep-alive',
				'Cookie':'vjuids=-4b19084b5.1596ef43cbf.0.710c44f6b3224; BIGipServerd1src_pool=1874396221.20480.0000; Hm_lvt_080dabacb001ad3dc8b9b9049b36d43b=1483632774,1483717334,1483717371,1484056485; Hm_lpvt_080dabacb001ad3dc8b9b9049b36d43b=1484056596; vjlast=1483625217.1484056485.11; f_city=%E5%8C%97%E4%BA%AC%7C101010100%7C',
				'Host':'d1.weather.com.cn',
				'Referer':'http://www.weather.com.cn/air/?city=101010100',
				'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
			}
		}
		request(options,(err,res,body) => {
			if(err) console.log(err);
			console.log( body )
		});
	}
}

let p1 = new Past24air();
let pPast24air = p1.init();

module.exports = pPast24air;

