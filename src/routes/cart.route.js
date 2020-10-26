const cartController = require('../controllers/cart.controller');
const userMiddleware = require('../middlewares/user.middleware');


module.exports = (app) => {
  app.post('/carts', userMiddleware.isAuthenticated, cartController.create);
};
