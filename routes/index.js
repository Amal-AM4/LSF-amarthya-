var express = require('express');
const adminController = require('../controllers/adminController');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', adminController.login)
router.get('/register', adminController.register)

module.exports = router;
