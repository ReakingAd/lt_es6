#天气API#

**API域名：** [http://es6.reakingad.com](http://es6.reakingad.com)

**数据来源：**[中国气象局](http://www.weather.com.cn/)面向社会和公众、以公益性为基础的气象服务门户网站。

#接口数据简介#

提供3种天气数据：

- 实时查询指定城市的天气
- 查询指定城市过去24小时空气质量
- 查询历史天气数据（限北京，2017年01月18日及之后）

#实时数据接口使用方法#

**示例**
	
	// 获取北京的实时天气数据
	http://www.weather.com.cn/api/getweather?city=101010100&type=1

**参数说明**

`city` 是城市代码。例如北京为101010100。具体可查询 [城市站号.xls](http://www.reakingad.com/site/getfile?n=城市站号.xls)

`type` 是查询类型。`1` 为实时查询，`2` 为查询过去24小时详细数据

**实时查询指定城市的天气**

get方式：
 
	http://www.weather.com.cn/api/getweather?city=城市代码&type=1
	
php代码：
		
	$url='http://es6.reakingad.com/api/getweather?city=城市代码&type=1';  
    $data = file_get_contents($url); 

JSONP：

	$.ajax({
		url:'http://es6.reakingad.com/api/getweather',
		type:'get',
		dataType:'jsonp',
		data:'city=城市代码&type=1',
		success:function(data){
			console.log( data );
		}
	});
	
**实时查询指定城市过去24小时空气质量**

只需要将 *实时查询* 实例代码中的 `type` 参数改为 `2` 即可

#历史数据接口使用方法#

*仅限北京，2017年01月18日及之后*

**示例：**

	http://es6.reakingad.com/api/getweatherhistory?city=101010100&r=2017-01-22to2017-01-24

**参数说明**

`city` 是城市代码。例如北京为101010100。具体可查询 [城市站号.xls](http://www.reakingad.com/site/getfile?n=城市站号.xls)

`r` 是要查询的时间外围。格式为 `起始时间` 和 `终止时间`用 `to` 链接，且二者都要符合ISO时间格式。例如 2017年01月22日至2017年01月24日的格式为 `2017-01-22to2017-01-24` 。


**查询历史天气数据**

get方式：
	
	http://es6.reakingad.com/api/getweatherhistory?city=101010100&r=2017-01-22to2017-01-24

php代码：
	
	$url='http://10.2.48.3:8080/api/getweather?city=101010100&type=1';  
	$data = file_get_contents($url);  
	
JSONP：
	
	$.ajax({
		url:'http://es6.reakingad.com/api/getweatherhistory',
		type:'get',
		dataType:'jsonp',
		data:'city=101010100&2017-01-01to2017-02-24',
		success:function(data){
			console.log( data );
		}
	});