const db = require('./db');
const bj_weatherModel = require('./bj_weather');

bj_weatherModel.find( (err,docs) => {
	if(err) console.log( err );
	console.log( docs );
})
