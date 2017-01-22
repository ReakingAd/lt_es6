const conf       = require('../config/conf.json');
const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;

let options = {
	server:{poolSize:5}
};

mongoose.connect('mongodb://' + conf.mongodb_es6_user + ':' + conf.mongodb_es6_pwd + '@localhost/es6',options);
let db = mongoose.connection;

db.on('error', err => {
	if(err) console.log( '数据库链接异常：： ' + err );
});

db.on('open',() => {
	console.log('mongodb connected');
});

module.exports = db;