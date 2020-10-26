const productController = require('../controllers/product.controller');

module.exports = (app) => {
  app.get('/products', productController.all);
};