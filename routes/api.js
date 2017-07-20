var express = require('express');
var router = express.Router();
var zxcvbn = require('zxcvbn');

router.post(function(req, res) {
    var results = zxcvbn(req.body.password);  
    res.send(results);
});

module.exports = router;