const { user } = require('../databases/config.database');
const userModel = require('../models/user.model');


exports.register = async (req, res) => {
  try {
    const response = await userModel.register(req.body);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({error});
  }
};


exports.login = async (req, res) => {
  try {
    const response = await userModel.login(req.body.username, req.body.password);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({error});
  }
}