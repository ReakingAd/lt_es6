const request = require('request');
const url = 'http://d1.weather.com.cn/calendar_new/2017/101010100_201701.html?_=1484025313476';

let options = {
	url:url,
	method:'get',
	proxy:'http://proxy.cmcc:8080',
	headers:{
		'Accept':'*/*',
		'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4',
		'Cache-Control':'max-age=0',
		'Cookie':'vjuids=318ff62d1.1596d43a84d.0.e67bf43dd82a4; f_city=%E5%8C%97%E4%BA%AC%7C101010100%7C; __auc=1aa351131596d6522afa84a1f65; BIGipServerd1src_pool=1874396221.20480.0000; Hm_lvt_080dabacb001ad3dc8b9b9049b36d43b=1484018803; Hm_lpvt_080dabacb001ad3dc8b9b9049b36d43b=1484025313; vjlast=1484018803.1484018803.30',
		'Host':'d1.weather.com.cn',
		'Proxy-Connection':'keep-alive',
		'Referer':'http://www.weather.com.cn/weather40d/101010100.shtml',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
	}
}
request(options,(err,res,body) => {
	if(err) return console.log( err );
	console.log( body )
});
