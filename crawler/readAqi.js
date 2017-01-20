const conf       = require('../myapp/config/conf.json');
const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
const co         = require('co');

let readAqi = () => {
	return new Promise( (resolve,reject) => {
		mongoose.connect('mongodb://' + conf.mongodb_es6_user + ':' + conf.mongodb_es6_pwd + '@localhost/es6');
		let db = mongoose.connection;

		db.on('error', err => {
			if(err) console.log( '链接数据库错误： ' + err );
		});

		db.on('open',() => {
			let weatherSchema = mongoose.Schema();
			let weatherModel = mongoose.model('bj_weather',weatherSchema);
			weatherModel.find( (err,docs) => {
				resolve(docs);
			});
		});
	});
}

co(function* (){
	let result = yield readAqi();
	console.log(result);
}).catch( err => {
	if(err) console.log( 'in co catch:: ' + err );
});