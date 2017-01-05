const request = require('request').defaults({proxy:'http://proxy.cmcc:8080'});
// let url = 'http://ali-weather.showapi.com/area-to-id?area=丽江';
let url = 'http://d1.weather.com.cn/aqi_all/99009.html?_=1483600275939';
url = encodeURI(url);
console.log(url)
let options = {
	url:url,
	method:'get',
	headers:{
		'Accept':'*/*',
		'Accept-Encoding':'gzip, deflate, sdch',
		'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4',
		'Cookie':'vjuids=318ff62d1.1596d43a84d.0.e67bf43dd82a4; BIGipServerd1src_pool=1874396221.20480.0000; __asc=1aa351131596d6522afa84a1f65; __auc=1aa351131596d6522afa84a1f65; Hm_lvt_080dabacb001ad3dc8b9b9049b36d43b=1483596868,1483599279; Hm_lpvt_080dabacb001ad3dc8b9b9049b36d43b=1483599991; f_city=%E5%8C%97%E4%BA%AC%7C101010100%7C; vjlast=1483596868.1483596868.30',
		'Host':'d1.weather.com.cn',
		'Proxy-Connection':'keep-alive',
		'Referer':'http://www.weather.com.cn/air/?city=101010100',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
	}
}
request(options,(err,res,body) => {
	if(err) return console.log( err );
	console.log( typeof body );
	console.log( body );
});