/**
 * 根据给定的格子坐标，返回格子的编号。例如[2,3]是第6个格子
 * @param {Array} coordArr 
 */
function calcNum(coordArr){
    if( !(coordArr instanceof Array) ){
        console.warn('wrong param');
        return coordArr;
    }
    let result = ( coordArr[0] - 1 ) * 3 + coordArr[1];

    return result;
}

/**
 * @desc 根据给定数值，计算其在“井”中的坐标。第一个格子坐标为[1,1]
 * @param {Number} num 
 */
function calcCoord(num){
    if( typeof num === 'string' ){
        num = parseInt( num );
    }
    if( typeof num !== 'number' || isNaN(num) ){
        console.warn('wrong param');
    }
    let xAixs = Math.ceil( num/3 );
    let yAixs = num%3 === 0 ? 3 : num%3;

    return [xAixs,yAixs];
}

/**
 * @desc 检测指定元素在数组中出现的次数
 * @param {Array} arr 
 * @param {Number} num 
 */
function arrCheck(arr,num){
    if( !(arr instanceof Array) ){
        console.warn('wrong param');
        return false;
    }
    if( typeof num === 'string' ){
        num = parseInt( num );
    }
    if( typeof num !== 'number' || isNaN(num) ){
        console.warn('wrong param');
        return false;
    }
    let count = 0;

    arr.forEach( item => {
        if( item === num ){
            count++;
        }
    })

    return count;
}

function formatQuerystring(querystring){
    let result      = new Map();
    querystring     = querystring.replace(/^\?/,'');
    let queryArr    = querystring.split('&');

    queryArr.forEach(item => {
        let _arr        = item.split('=');
        let [key,value] = _arr;

        result.set(key,value);
    });

    return result;
}

export default {calcNum,calcCoord,arrCheck,formatQuerystring};