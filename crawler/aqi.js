const request = require('request');
const co = require('co');
const moment = require('moment');
const fs = require('fs');

// let url = 'http://www.weather.com.cn/';
// let url = 'http://d1.weather.com.cn/dingzhi/101010100.html?_=1483632776033';
// let url = 'http://www.weather.com.cn/air/?city=101010100';
let nowTimestamp = moment.now();
let url = 'http://d1.weather.com.cn/aqi_all/101010100.html?_=' + nowTimestamp;
// let url = 'http://www.weather.com.cn/air/?city=101010100';

let options = {
	url:url,
	method:'get',
	proxy:'http://proxy.cmcc:8080',
	encoding:'utf8',  // 作为buffer接收
	headers:{
		'Accept':'*/*',
		'Accept-Encoding':'gzip, deflate, sdch',
		'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4',
		'Cache-Control':'no-cache',
		'Connection':'keep-alive',
		'Cookie':'BIGipServerd1src_pool=1874396221.20480.0000; vjuids=-4b19084b5.1596ef43cbf.0.710c44f6b3224; f_city=%E5%8C%97%E4%BA%AC%7C101010100%7C; returnUrl=http%3A%2F%2Fwww.weatherdt.com%2F; userInfo=%7B%22createTime%22%3A1483627953000%2C%22email%22%3A%22reakingad%40reakingad.com%22%2C%22expiry%22%3A1483671451142%2C%22nickName%22%3A%22%22%2C%22uId%22%3A%221483627953363084%22%2C%22userName%22%3A%22euser_1483627953237264%22%7D; accessToken=OFACEQ4EBhZ0CAMBAk5ZURhHXltSXxVEWVxcDFEQCwcMHgJXSwEDDhkdGwkEJzITBgoOGx1HAApKQxsFRwxWDREVD1IOS1ZdFEtGUFFURhVcWEdUQ1AaHA0ODRMMBklfUFEMQxstRFZSRxFAUFpTVBdOXF9fFkBFXlJHXgIYGhYUIRMZEExfYRcUEA4XLUIUWV1SEkNRUBNGW15XUBRVFA%3D%3D; Hm_lvt_080dabacb001ad3dc8b9b9049b36d43b=1483631833,1483632488,1483632606,1483632774; Hm_lpvt_080dabacb001ad3dc8b9b9049b36d43b=1483632774; vjlast=1483625217.1483632488.13',
		'Host':'d1.weather.com.cn',
		'Pragma':'no-cache',
		'Proxy-Connection':'keep-alive',
		'Referer':'http://www.weather.com.cn/',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
	}
}
request(options,(err,res,body) => {
	console.log( body )
	// console.log( body.toString('utf8') )
	// let kk = fs.createWriteStream('text.txt',(err) => {
	// 	if(err) return console.log( err );
	// 	console.log(111)
	// })
	// body.pipe(kk)
	var _encode = res.headers['content-type'] 
	console.log( '=============' )
	console.log( _encode )
	console.log( '===========' )
	console.log( res )
	console.log( '===========' )
	console.log( typeof body )
});
// let getHtmlByUrl = url => {	
// 	return new Promise( (resolve,reject) => {
// 		request.get(url,(err,res,body) => {
// 			if(err) return console.log( err );
// 			resolve(body);
// 		});
// 	});
// }

// let parseInfo = html => {
// 	return new Promise( (resolve,reject) => {
// 		// const rAqi = /(id="aqi">)(.*?<\/span>.*?aqis)/g;
// 		const rAqi = /(id="windD">)(.*?<\/span>.*?aqis)/g;

// 		let result = rAqi.exec(html);
// 		console.log( result[1] )
// 		console.log( result[2] )
// 		console.log( result[3] )
// 		return;
// 		let infoObj = {
// 			aqi:result[1]
// 		}
// 		resolve(infoObj);
// 	});
// }

// co(function* (){
// 	let html = yield getHtmlByUrl(url);
// 	console.log( html )
// 	let infoObj = yield parseInfo(html);
// 	console.log( infoObj );
// });