const Past24air = require('./past24air');


let p1 = new Past24air(101021200);
let airData = p1.init();

airData.then( data => {
	console.log( data );
});