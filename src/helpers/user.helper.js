const jwt = require('jsonwebtoken');

exports.sign = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      let accessToken = jwt.sign(
        payload, 
        process.env.ACCESS_TOKEN_SECRET, 
        {
          algorithm: process.env.ALGORITHM,
          expiresIn: process.env.ACCESS_TOKEN_LIFE
        }
      );
    
      resolve(accessToken);
    } catch (error) {
      throw new Error(error);
    }
  });
};


exports.verify = (token) => {
  return new Promise((resolve, reject) => {
    try {
      if (!token) {
        reject('Authentication required!');
      }

      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      resolve(payload);
    } catch (error) {
      reject(error.toString());
    }
  });
};


