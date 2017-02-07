/*
@desc	利用Linux的crontab，每天中午12:00执行一次这个脚本。保存北京当天12:00的天气数据进mongodb
*/
const conf                       = require('../myapp/config/conf.json');
const Weather                    = require('./weather');
const cityCode                   = '101010100';  // 北京市
const co                         = require('co');
const [mongoose,bj_weatherModel] = require('../myapp/database/bj_weather');

/*
@param {String} cityCode 城市站号
@return {Promise} 包含JSON格式的包含城市的天气信息
@desc 调用外部爬虫，将爬取结果以Promise返回
*/
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
@return {Object} weatherinfoObj
@desc 	将爬取的结果增加一个字段createAt,类型为Number
*/
let addFieldCreateAt = weatherInfo => {
	let weatherInfoObj = JSON.parse( weatherInfo );
		
	weatherInfoObj.createAt = Date.now();
	return weatherInfoObj;
}

/*
@param {Object} weatherInfoObj
@return {Promise} 不包含数据
@desc 将传入的天气信息存入db
*/
let saveIntoDB = weatherInfoObj => {
	return new Promise( (resolve,reject) => {
		let bj_weatherEntity = new bj_weatherModel( weatherInfoObj );
		
		bj_weatherEntity.save( err => {
			if(err) {
				console.log('save into db failed:: ' + err);
				reject(err);
			}
			else{
				resolve();
			}
		});
	});
}

/*
@params {Object} 连接了db的mongoose实例
@return {Promise} 不包含数据
@desc 关闭当前脚本所使用的mongodb连接
*/
let closeDbConnection = mongoose => {
	return new Promise( (resolve,reject) => {
		mongoose.connection.close( err => {
			if(err){
				console.log('err when closing db connection:: ' + err);
				reject(err);
			}
			else{
				console.log('close db conection successfully');
				resolve();
			}
		});
	});
}

co(function* (){
	let weatherInfo    = yield getWeatherInfo( cityCode );
	let weatherInfoObj = addFieldCreateAt(weatherInfo);

	yield saveIntoDB( weatherInfoObj );
	yield closeDbConnection( mongoose );
}).catch( err => {
	if( err ){
		console.log( 'err in co:: ' + err );
	}
});

process.on('uncaughtException',err => {
	console.log( 'err in uncaughtException:: ' + err );
});