/*
@desc	利用Linux的crontab，每天中午12:00执行一次这个脚本。保存北京当天12:00的天气数据进mongodb
*/
const conf            = require('../myapp/config/conf.json');
const Weather         = require('./weather');
const cityCode        = '101010100';  // 北京市
const co              = require('co');
const db              = require('../myapp/database/db');
const bj_weatherModel = require('../myapp/database/bj_weather');

let getWeatherInfo = cityCode => {
	return new Promise( (resolve,reject) => {
		let w1       = new Weather( cityCode );
		let pWeather = w1.init();

		pWeather.then( weatherinfo => {
			resolve( weatherinfo );
		});
	});
}

/*
@param  {JSON} weatherinfo
@return {obj} weatherinfoObj
@desc 	将爬取的结果增加一个字段createAt,类型为Number
*/
let addFieldCreateAt = weatherInfo => {
	let weatherInfoObj = JSON.parse( weatherInfo );
		
	weatherInfoObj.createAt = Date.now();
	console.log( weatherInfoObj.createAt )
	return weatherInfoObj;
}

let saveIntoDB = weatherInfoObj => {
	return new Promise( (resolve,reject) => {
		let bj_weatherEntity = new bj_weatherModel( weatherInfoObj );
		
		bj_weatherEntity.save( err => {
			if(err) return console.log(err);
			resolve('save into DB successfully.');
		});
	});
}

co(function* (){
	let weatherInfo = yield getWeatherInfo( cityCode );
	let weatherInfoObj     = addFieldCreateAt(weatherInfo)
	let result      = yield saveIntoDB( weatherInfoObj );
	console.log( result )
}).catch( err => {
	if( err ){
		console.log( 'err in co:: ' + err );
	}
});

process.on('uncaughtException',err => {
	console.log( err );
});