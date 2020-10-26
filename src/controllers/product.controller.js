const productModel = require('../models/product.model');

exports.all = (req, res) => {
  console.log(req.user);
  productModel.all(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(error => res.status(400).send({error}));
};


exports.create = (req, res) => {
  productModel.create(req.body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch((error) => res.status(400).send({error}));
};


exports.get = (req, res) => {
  productModel.get(req.params.product_id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch((error) => res.status(400).send({error}));
};


exports.update = (req, res) => {
  productModel.update(req.params.product_id, req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch((error) => res.status(400).send({error}));
};


exports.delete = (req, res) => {
  productModel.delete(req.params.product_id)
    .then(response => {
      res.status(204).send(response);
    })
    .catch((error) => res.status(400).send({error}));
};
