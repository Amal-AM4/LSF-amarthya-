var express = require('express');
const prisma = require("../config/database");
const adminController = require('../controllers/adminController');
const empController = require('../controllers/empController');
const userController = require('../controllers/userController');


const authAdmin = require('../middlewares/authAdmin');
const authEmp = require('../middlewares/authEmp');
const authUser = require('../middlewares/authUser');

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const category = await prisma.JobCategory.findMany();

    res.render('index', { data: category });
  } catch (error) {
    console.error(error);
  }
});

// Fetch available employees based on place and job category
router.get('/search', async (req, res) => {
  const { place, jobCategoryId } = req.query;

  try {
    const employees = await prisma.Employee.findMany({
      where: {
        place: place,
        expertiseId: parseInt(jobCategoryId),
        isAvailable: true,
      },
      include: {
        expertise: true // To get job category details
      }
    });

    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching employees' });
  }
});




// admin
router.get('/admin/logout', adminController.adminLogout);
router.get('/admin/login', adminController.adminLogin);
router.get('/admin/index',authAdmin, adminController.home);
router.get('/admin/addCategory',authAdmin, adminController.addCategory);
router.get('/admin/empDetails',authAdmin, adminController.empDetails);
router.get('/admin/removeCategory/:id',authAdmin, adminController.removeCategory);
router.get('/admin/removeEmp/:id',authAdmin, adminController.removeEmp);

router.post('/admin/login', adminController.adminLoginProcess);
router.post('/admin/addCategory', adminController.categoryAdd);

// emp
router.get('/emp/login', empController.empLogin);
router.get('/emp/logout', empController.empLogout);
router.get('/emp/register', empController.empReg);
router.get('/emp/index', authEmp, empController.home);

router.post('/emp/register', empController.empRegData);
router.post('/emp/login', empController.empLoginProcess);

// user
router.get('/user/login', userController.login);
router.get('/user/logout', userController.userLogout);
router.get('/user/register', userController.register);
router.get('/user/dashboard', authUser, userController.dashboard);

router.post('/user/register', userController.registerUserData);
router.post('/user/login', userController.userLoginProcess);



module.exports = router;
