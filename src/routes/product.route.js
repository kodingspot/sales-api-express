const productController = require('../controllers/product.controller');

module.exports = (app) => {
  app.get('/products', productController.all);
  app.post('/products', productController.create);
  app.put('/products/:product_id', productController.update);
  app.delete('/products/:product_id', productController.delete);
};
