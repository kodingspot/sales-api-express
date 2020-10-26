const cartModel = require('../models/cart.model');

exports.create = async (req, res) => {
  try { 
    // console.log(req.body);
    const cart = await cartModel.create(req.user, req.body);
    res.status(201).send(cart);
  } catch (error) {
    res.status(400).send({error});
  } 
};

