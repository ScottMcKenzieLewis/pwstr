const express = require('express');
const zxcvbn = require('zxcvbn');

const apiV1 = express.Router();

apiV1.post("/checkpasswordstrength", checkPasswordStrength);

function checkPasswordStrength(req, res) {
    req.checkBody('password', 'Password cannot be empty.').notEmpty();	
	let errors = req.validationErrors();
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