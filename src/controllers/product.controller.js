const productModel = require('../models/product.model');

exports.all = (req, res) => {
  productModel.all(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(error => res.status(400).send({error}));
};


exports.create = (req, res) => {
  console.log(req.body)
  productModel.create(req.body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch((error) => res.status(400).send({error}));
}