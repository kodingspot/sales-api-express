const productModel = require('../models/product.model');

exports.all = (req, res) => {
  productModel.all(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(error => res.status(400).send({error}));
};