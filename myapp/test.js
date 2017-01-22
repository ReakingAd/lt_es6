const db = require('./database/db');
const bj_weatherModel = require('./database/bj_weather');

// let _date = new Date(2017,1,1,23,53,23)
let _date = Date.now();
console.log( _date )
return;
bj_weatherModel.find().where('createAt').lt(_date).exec( (err,docs) => {
	if(err) return console.log( err );
	// console.log( (new Date(docs.createAt)).getTime() )
	console.log( docs )
});

// {"nameen" : "beijing", "cityname": "北京", "city" : "101010100", "temp" : "-6", "tempf" : "21", "WD" : "西南风","wde" : "SW ", "WS" : "1级", "wse" : "&lt;12km/h", "SD" : "33%", "time" : "22:20", "weather" : "多云", "weathere" : "Cloudy", "weathercode" : "n01", "qy" : "1025", "njd" : "暂无实况", "sd" : "33%", "rain" : "0", "rain24h" : "0", "aqi" : "85", "limitnumber" : "3和8", "aqi_pm25" : "85", "date" : "01月20日(星期五)", "createAt" : ISODate("2017-01-18T14:42:58.967Z")}