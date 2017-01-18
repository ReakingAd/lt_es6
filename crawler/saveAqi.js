const conf       = require('../myapp/config/conf.json');
const Weather    = require('./weather');
const cityCode   = '101010100';  // 北京市
const co         = require('co');
const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;

let getWeatherInfo = cityCode => {
	return new Promise( (resolve,reject) => {
		let w1       = new Weather( cityCode );
		let pWeather = w1.init();

		pWeather.then( weatherinfo => {
			resolve( weatherinfo );
		});
	});
}

let saveIntoDB = weatherInfo => {
	return new Promise( (resolve,reject) => {
		mongoose.connect('mongodb://' + conf.user + ':' + conf.pwd + '@localhost/es6');
		let db = mongoose.connection;

		db.on('error',err => {
			if(err) console.log( '链接DB出错： ' + err );
		});

		db.on('open', () => {
			let weatherInfoObj = JSON.parse( weatherInfo );
			let weatherSchema = mongoose.Schema({
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
			let weatherModel = mongoose.model('bj_weather',weatherSchema);
			let weatherEntity = new weatherModel( weatherInfoObj );

			weatherEntity.save(err => {
				if( err ){
					console.log( '存储db出错： ' + err );
				}
				resolve('save into DB successfully.');
			});
		});
	});
}

// 每天中午 12:00 执行爬去一次数据
co(function* (){
	let weatherInfo = yield getWeatherInfo( cityCode );
	let result      = yield saveIntoDB( weatherInfo );
	console.log( result )
}).catch( err => {
	if( err ){
		console.log( 'err in co:: ' + err );
	}
});

process.on('uncaughtException',err => {
	console.log( err );
});