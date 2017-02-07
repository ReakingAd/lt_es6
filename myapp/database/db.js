const conf       = require('../config/conf.json');
const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;

let options = {
	server:{
		auto_reconnect:true,
		poolSize:5
	}
};

mongoose.connect('mongodb://' + conf.mongodb_es6_user + ':' + conf.mongodb_es6_pwd + '@localhost/es6',options,err => {
	if(err){
		console.log('mongodb connection failed:: ' + err);
	}
	else{
		console.log('mongodb connection successfully');
	}
});

module.exports = mongoose;