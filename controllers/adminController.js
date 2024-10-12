require('dotenv').config();

async function login(req, res) {
    try {
        res.render('login')
    } catch (error) {
        console.error(error);
    }
}

async function register(req, res) {
    try {
        res.render('register')
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    login, register
};