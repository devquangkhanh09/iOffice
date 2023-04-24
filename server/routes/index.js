var express = require('express');
var { code } = require('../qrcode');

var router = express.Router();

router.post('/qrcode', function(req, res, next) {
  if (req.body.code === code) {
    res.send('success');
  } else {
    res.send('failure');
  } 
});

module.exports = router;
