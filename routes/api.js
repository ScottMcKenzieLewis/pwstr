var express = require('express');
var router = express.Router();
var zxcvbn = require('zxcvbn');

router.post('/checkpasswordstrength', function(req, res) {
    req.checkBody('password', 'Password cannot be empty.').notEmpty();	
	var errors = req.validationErrors();
	if (!errors) {
		req.sanitize('password').escape();
	    var results = zxcvbn(req.body.password);  
        res.send(results);
	} else {
		res.status(500);
		res.send(errors);
	}
});

module.exports = router;