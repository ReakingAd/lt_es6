# 天气API

---

###**简介**

 - 数据来源于[中国气象局][1]
 - 支持实时查询和历史查询
  [1]: http://www.weather.com.cn/

###**使用说明**
示例：[http://es6.reakingad.com/api/weather?city=101010100&type=1][2]
[2]:http://es6.reakingad.com/api/weather?city=101010100&type=1
参数：

- city是城市或地区的代码，具体可查询 [城市站号][3]。例如北京为101010100
- type是查询类型。1为天气实时数据，2为过去24小时数据
[3]:http://www.weatherdt.com/BaiduApiStore
代码：

    `$.ajax({
	    url:'http://es6.reakingad.com/api/weather',
		type : 'get',
		cache : false,
		data:'city=101010100',
		dataType : 'jsonp',
		success : function(data) {
			console.log( data )
		}
	});`
	1
	

    1111console.log(1111)
    
      
 

