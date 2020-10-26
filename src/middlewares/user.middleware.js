const userHelper = require('../helpers/user.helper');

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    await userHelper.verify(token);
    next();
  } catch (error) {
    res.status(401).send({error})
  }
};

