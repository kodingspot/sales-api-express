const productController = require('../controllers/product.controller');
const userMiddleware = require('../middlewares/user.middleware');


module.exports = (app) => {
  app.get('/products', userMiddleware.isAuthenticated, productController.all);
  app.post('/products', userMiddleware.isAuthenticated, productController.create);
  app.get('/products/:product_id', userMiddleware.isAuthenticated, productController.get);
  app.put('/products/:product_id', userMiddleware.isAuthenticated, productController.update);
  app.delete('/products/:product_id', userMiddleware.isAuthenticated, productController.delete);
};
