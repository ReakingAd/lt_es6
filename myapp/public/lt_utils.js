/*
@param {string} str
@return {boolean}
@desc 判断一个字符串，是否是一个合法的函数名
*/
module.exports.isLegalFuncName = str => {
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
