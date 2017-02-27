const express = require('express');
const router  = express.Router();
const ejs     = require('ejs');
const fs      = require('fs');

/* GET home page. */
router.get('/pubsub/index', (req, res, next) => {
	res.render('demo/pubsub/index');
});

router.get('/pubsub/getContent',(req,res) => {
	let {tplName} = req.query;
	let str       = fs.readFileSync('./views/demo/pubsub/' + tplName + '.ejs').toString();
	let html      = ejs.render(str,{test: 'value123'});

	res.send( html );
});

module.exports = router;
