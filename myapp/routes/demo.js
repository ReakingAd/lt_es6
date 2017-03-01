const express        = require('express');
const router         = express.Router();
const ejs            = require('ejs');
const fs             = require('fs');
const path           = require('path');
const pGetSelections = require('../database/shirts');

router.get('/pubsub/index', (req, res, next) => {
	res.render('demo/pubsub/index');
});


/*
@desc 返回衬衫的所有选项的初始值
*/
router.get('/pubsub/getSelections',(req,res) => {
	let selections = {};
	let sendData = '';

	pGetSelections().then( selections => {
		sendData = selections;
		res.send( sendData );
	}).catch( err => {
		console.log( err );
		sendData = {
			status:'err',
			msg:'获取selections失败'
		}
		res.send( sendData );
	});
});
/*
@desc  处理ajax请求,返回指定模板渲染好的html代码给前端
@params   {String} tplName 模板名字
@return   {String} 指定模板的html代码作为响应返回
*/ 
router.get('/pubsub/getContent',(req,res) => {

	let resData     = {};
	let { tplName } =  req.query;

	if( !tplName ){
		resData = {
			status:'err',
			msg:'缺少模板名字参数',
		}
	}
	else{
		let tplStr = '';

		try{
			let tplPath = path.join( __dirname,'../views/demo/pubsub/' + tplName + '.ejs' );

			tplStr      = fs.readFileSync( tplPath ).toString();
		}catch(err){
			resData = {
				status:'err',
				msg:'未找到指定模板'
			}
		}
		if( tplStr ){
			try{
				let html = ejs.render( tplStr,{test: 'value123'} );

				resData = {
					status:'success',
					msg:html
				}
			}catch(err){
				resData = {
					status:'err',
					msg:'渲染模板出错'
				}
			}
		}
	}
	res.setHeader('Cache-Control','public,max-age:111111');
	res.send( resData );
});

module.exports = router;
