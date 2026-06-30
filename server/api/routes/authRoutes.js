module.exports = (app) => {
    const authController = require('../controllers/authController');

    app.post('/auth/register', authController.register);
    app.post('/auth/login', authController.login);
};