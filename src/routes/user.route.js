const userController = require('../controllers/user.controller');

module.exports = (app) => {
  app.post('/users/register', userController.register);
  app.post('/users/login', userController.login);
};
