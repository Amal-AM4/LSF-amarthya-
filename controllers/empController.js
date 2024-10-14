const jwt = require("jsonwebtoken");
const prisma = require("../config/database");

require('dotenv').config();
const CODE = process.env.JSON_KEY;

async function empLogin (req, res) {
    res.render('emp/login');
}

async function empReg (req, res) {
    try {
        const category = await prisma.JobCategory.findMany({
            orderBy: {
                createdAt: 'desc',
            }
        });
        res.render('emp/register', { data: category });
    } catch (error) {
        console.error(error);
    }
}

async function empRegData (req, res) {
    try {
        const { name, phone, category, exp, addr, place, password } = req.body;
        const addEmpData = await prisma.Employee.create({
            data: {
                name: name,
                phone: phone,
                expertiseId: parseInt(category),
                experience: parseInt(exp),
                address: addr,
                place: place,
                password: password
            }
        });

        console.log('Employee added');
        res.redirect('/emp/login');
    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    empLogin, empReg, empRegData,
}