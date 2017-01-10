class Crawler{
	constructor(name,age){
		this.name = name;
		this.age = age;
	}
	sayHello(){
		console.log('Hello,I\'m ' + this.name);
	}
}

module.exports = Crawler;

