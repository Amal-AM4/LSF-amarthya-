var express = require('express');
const prisma = require("../config/database");

const jwt = require('jsonwebtoken');

require('dotenv').config();
const CODE = process.env.JSON_KEY;

const adminController = require('../controllers/adminController');
const empController = require('../controllers/empController');
const userController = require('../controllers/userController');

const authAdmin = require('../middlewares/authAdmin');
const authEmp = require('../middlewares/authEmp');
const authUser = require('../middlewares/authUser');

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const userToken = req.cookies.userToken;

  if (userToken === undefined) {
    try {
      const category = await prisma.JobCategory.findMany();
  
      res.render('index', { data: category, active: false, dashboardOpt: false });
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const category = await prisma.JobCategory.findMany();
  
      res.render('index', { data: category, active: true, dashboardOpt: true });
    } catch (error) {
      console.error(error);
    }
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

// POST route to book an employee
router.post('/book/:empId', authUser, async (req, res) => {
  const empId = parseInt(req.params.empId);
  const userToken = req.cookies.userToken; // Get the token from cookies (server-side)
  
  if (!userToken) {
    return res.status(401).send('Please login to book an employee.');
  }

  try {
    // Verify token (assuming you use jwt)
    const decoded = jwt.verify(userToken, CODE);
    const id = decoded.userId;

    console.log(decoded);
    
    
    // Fetch employee and job category details
    const employee = await prisma.Employee.findUnique({
      where: { id: empId },
      include: { expertise: true }
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Create a new booking record
    const booking = await prisma.Booking.create({
      data: {
        userId: parseInt(id),
        employeeId: empId,
        jobCategoryId: employee.expertiseId,
        date: new Date(),
        status: 'PENDING'
      }
    });

    // Update employee's availability to false
    await prisma.Employee.update({
      where: { id: empId },
      data: { isAvailable: false }
    });

    res.status(200).json({ message: 'Employee booked successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error booking employee' });
  }
});




// admin
router.get('/admin/logout', adminController.adminLogout);
router.get('/admin/login', adminController.adminLogin);
router.get('/admin/index',authAdmin, adminController.home);
router.get('/admin/addCategory',authAdmin, adminController.addCategory);
router.get('/admin/empDetails',authAdmin, adminController.empDetails);
router.get('/admin/userDetails',authAdmin, adminController.userDetails);
router.get('/admin/removeCategory/:id',authAdmin, adminController.removeCategory);
router.get('/admin/removeEmp/:id',authAdmin, adminController.removeEmp);
router.get('/admin/removeUser/:id',authAdmin, adminController.removeUser);

router.post('/admin/login', adminController.adminLoginProcess);
router.post('/admin/addCategory', adminController.categoryAdd);

// emp
router.get('/emp/login', empController.empLogin);
router.get('/emp/logout', empController.empLogout);
router.get('/emp/register', empController.empReg);
router.get('/emp/index', authEmp, empController.home);
router.get('/emp/booking', authEmp, empController.booking);
router.get('/emp/bookingUpdate/:id', authEmp, empController.jobCompleted);

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
