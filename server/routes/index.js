var express = require('express');
var { getCode } = require('../qrcode');

var router = express.Router();

router.post('/qrcode', function(req, res, next) {
  const code = getCode();
  if (req.body.code === code) {
    res.send('success');
  } else {
    res.send('failure');
  } 
});

module.exports = router;
