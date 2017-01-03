const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/es6'); // 链接数据库
const Schema = mongoose.Schema; // 创建模型

let userScheMa = new Schema({
	name:String,
	password:String
}); // 定义了一个新的模型，但是此模型还未知和users集合有关联

exports.user = db.model('users',userScheMa); // 与users集合并联