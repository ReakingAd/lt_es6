var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;


db.on('error',console.error.bind(console,'链接错误：'));
db.once('open',function(ballback){
	var kittySchema = mongoose.Schema({
		name:String
	});
	kittySchema.methods.speak = function(){
		var greeting = this.name
			? 'Meow name is ' + this.name
			: 'I don\'t have a name';
		console.log( greeting );
	}

	var Kitten = mongoose.model('Kittenaaa',kittySchema);
	var fluffy = new Kitten({name:'fluffyaaa'});

	// fluffy.save(function(err,fluffy){
	// 	if(err) return console.error(err);
	// 	fluffy.speak();
	// });

	Kitten.find({name:/^fluff/},function(err,kittens){
		if(err) return console.error(err);
		console.log( kittens );
	});
});