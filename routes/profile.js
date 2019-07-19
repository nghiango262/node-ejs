var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('main/profile');
});

router.post('/', function(req, res){
  res.send('contact');
  console.log(req.body);
});

module.exports = router;