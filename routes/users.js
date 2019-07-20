var express = require('express');
var router = express.Router();
const db = require('../helpers/db');
const User = db.User;


/* GET home page. */
router.get('/',async function(req, res, next) {
  let users =  await User.find().select();
  res.render('../views/partials/index', { title: 'Express', users: users });
});


module.exports = router;
