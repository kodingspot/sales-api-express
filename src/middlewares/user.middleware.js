const userHelper = require('../helpers/user.helper');
const userModel = require('../models/user.model');

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = await userHelper.verify(token);
    req.user = await userModel.get(payload.username);
    next();
  } catch (error) {
    res.status(401).send({error})
  }
};

