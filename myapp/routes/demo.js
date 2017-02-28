const express = require('express');
const router  = express.Router();
const ejs     = require('ejs');
const fs      = require('fs');
const path    = require('path'); 

router.get('/pubsub/index', (req, res, next) => {
	res.render('demo/pubsub/index');
});

router.get('/pubsub/getContent',(req,res) => {
	let { tplName } = req.query;
	let tplPath     = path.join( __dirname,'../views/demo/pubsub/' + tplName + '.ejs' ); 
	let str         = fs.readFileSync( tplPath ).toString();
	let html        = ejs.render( str,{test: 'value123'} );
	res.send( html );
});

module.exports = router;
