// mongoose 链接
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.createConnection('mongodb://localhost/NodeJS');

// 链接错误
db.on('error',function(error){
	console.log('err: ' + error);
});

// Schema结构
var mongooseSchema = new mongoose.Schema({
	username:{type:String,default:'匿名用户'},
	title:{type:String},
	content:{type:String},
	time:{type:Date,default:Date.now},
	age:{type:Number}
});

// model
var mongooseModel = db.model('mongoosefff',mongooseSchema);

// 增加记录 基于model操作
var doc = {username:'model_demo_username',title:'model_demo_title',content:'model_demo_content'};

// mongooseModel.create(doc,function(error){
// 	if(error){
// 		console.log(error);
// 	}
// 	else{
// 		console.log('save OK!');
// 	}
// 	// 关闭数据库链接
// 	db.close();
// });

// mongoose find
var criteria = {title:'model_demo_title'}; // 查询条件
var fields = {title:1,content:1,time:1,username:1}; // 待返回的字段
var options = {};
mongooseModel.find(criteria,fields,options,function(error,result){
	if(error){
		console.log(error);
	}
	else{
		console.log(result);
	}
	db.close();
});