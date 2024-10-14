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
router.get('/admin/addCategory',authAdmin, adminController.addCategory);
router.get('/admin/removeCategory/:id',authAdmin, adminController.removeCategory);
router.post('/admin/login', adminController.adminLoginProcess);
router.post('/admin/addCategory', adminController.categoryAdd);

router.get('/login', adminController.login);
router.get('/register', adminController.register);


module.exports = router;
