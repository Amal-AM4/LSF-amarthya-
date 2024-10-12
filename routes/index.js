var express = require('express');
const adminController = require('../controllers/adminController');
const authAdmin = require('../middlewares/authAdmin');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// admin
router.get('/admin/logout', adminController.adminLogout);
router.get('/admin/login', adminController.adminLogin);
router.get('/admin/index',authAdmin, adminController.home);
router.post('/admin/login', adminController.adminLoginProcess);

router.get('/login', adminController.login);
router.get('/register', adminController.register);


module.exports = router;
