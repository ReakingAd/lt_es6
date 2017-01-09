var mongoose = require('mongoose'); // 应用mongoose模块
mongoose.Promise = global.Promise;
var db = mongoose.createConnection('localhost','test'); // 创建一个数据库链接
// https://cnodejs.org/topic/504b4924e2b84515770103dd
db.on('error',console.error.bind(console,'链接错误：'));
db.once('open',function(){
	// 一次打开记录
	console.log(111111111);
	var PersonSchema = new mongoose.Schema({
		name:String  // 定义一个属性name，类型为String
	});

	var PersonModel = db.model('Person',PersionSchema);
	// 如果该Model已经发布，则可以直接通过名字索引到，如下：
	// var PersonModel = db.model('Person');
	// 如果没有发布，上一段代码将会异常

	var personEntity = new PersonModel({name:'Krouky'});
	// 打印这个实体的名字看看
	console.log( personEntity.name );
});