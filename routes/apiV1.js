var express = require('express');
var zxcvbn = require('zxcvbn');

var apiV1 = express.Router();

apiV1.post("/checkpasswordstrength", checkPasswordStrength);

function checkPasswordStrength(req, res) {
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
}

module.exports = apiV1;