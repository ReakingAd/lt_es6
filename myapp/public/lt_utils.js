class LT_utils{
	constructor(){

	}
	isLegalFuncName(str){
		if( typeof str !== 'string' ){
			return false;
		}
		let rFnName = /([^_])/g;
		let firstLetter = rFnName.exec( str )[1];
		let rIsLetter = /[a-zA-Z]/g;
		if( rIsLetter.test( firstLetter ) ){
			return true;
		}
		return false;	
	}	
}

let lt_utils = new LT_utils();

module.exports = lt_utils;
