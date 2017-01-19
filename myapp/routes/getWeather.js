/*
@desc	 	根据参数，调用不同的爬虫，获取并返回指定的天气数据。 	 
@params  	{city:String,type='1'}  
				1.其中 city 是城市代码，在excel中查询。type有两种值，1代表实时结果，2代表过去24的结果
				2.如果未传入参数，则使用{cityCode:'1010100',type:'1'}作为参数
				3.如果传入的obj参数不能正确的解构出cityCode则使用默认值 101010100 ,同理type默认值 1
@return  	Promise    其then()方法得到的结果是个object,保存着天气信息  
*/
const Weather    = require('../../crawler/weather');
const Past24air  = require('../../crawler/past24air');

function getWeather( {city:cityCode = '101010100',type = '1'} = {cityCode:'1010100',type:'1'} ){
	let errMsg = {};
	// 缺少 城市站号 返回错误信息
	if( !cityCode ){
		return new Promise( (resolve,reject) => {
			errMsg.desc = '缺少参数city';
			resolve(errMsg)
		});
	}
	// 有城市站号
	else{
		// 查询 实时天气
		if( type === '1' ){
			if( cityCode ){
				let w1        = new Weather(cityCode);
				let pWeather  = w1.init();

				return pWeather;
			}
		}
		// 查询过去 24小时空气质量
		else if ( type === '2' ){
			if( cityCode ){
				let p1         = new Past24air(cityCode);
				let pPast24air = p1.init();

				return pPast24air;
			}
		}
		else{
			return new Promise( (resolve,reject) => {
				errMsg.desc = '参数type错误';
				resolve(errMsg)
			});
		}
	}
}

module.exports = getWeather;