const mongoose = require('mongoose');

let bj_weatherSchema = mongoose.Schema({
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
});
let bj_weatherModel = mongoose.model('bj_weather',bj_weatherSchema);

module.exports = bj_weatherModel;