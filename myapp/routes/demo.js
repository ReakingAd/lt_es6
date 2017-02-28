const express = require('express');
const router  = express.Router();
const ejs     = require('ejs');
const fs      = require('fs');
const path    = require('path'); 

router.get('/pubsub/index', (req, res, next) => {
	res.render('demo/pubsub/index');
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

	res.send( resData );
});

module.exports = router;
