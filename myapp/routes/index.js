const express    = require('express');
const router     = express.Router();
const user       = require('../database/db').user;

const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
const pWeather   = require('../../crawler/weather');
const co  		 = require('co');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login',(req,res) => {
	res.render('login',{title:'login'})
});

/* ucenter */
router.post('/ucenter', (req, res) => {
	var query = {name: req.body.name, password: req.body.password};
	(function(){
		  user.count(query, function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
				if(doc == 1){
					console.log(query.name + ": 登陆成功 " + new Date());
					res.render('ucenter', { title:'ucenter' });
				}else{
					console.log(query.name + ": 登陆失败 " + new Date());
					res.redirect('/');
				}
	  	});
	})(query);
});

router.get('/getweather',(req,res) => {
	pWeather.then( kk => {
		res.send( kk );
	})
});
module.exports = router;
