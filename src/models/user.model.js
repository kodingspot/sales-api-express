const crypto = require('crypto');
const userHelper = require('../helpers/user.helper');
const connectionDatabase = require('../databases/connection.database');


const get = exports.get = (username) => {
  return new Promise((resolve, reject) => {
    if ( !username ) {
      reject({error: 'Username cannot be empty!'});
    }

    const sql = 'SELECT * FROM user WHERE username = ?';
    connectionDatabase.query(sql, username, (err, res) => {
      if ( err ) {
        reject(err.toString());
        return;
      }

      if ( res.length <= 0 ) {
        reject('Username not found in user!');
        return;
      }

      resolve(res[0]);
      return;
    });
  });
};


const checkPassword = exports.checkPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      reject('Username or password cannot be empty!');
      return;
    }

    const shaPassword = crypto.createHash('sha256').update(password).digest('hex');
    const sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
    const payloads = [
      username,
      shaPassword
    ];

    connectionDatabase.query(sql, payloads, (err, res) => {
      if ( err ) {
        reject(err.toString());
        return;
      }

      if ( res.length <= 0 ) {
        resolve(false);
        return;
      }

      resolve(true);
      return;
    });
  })
};


exports.register = (user) => {
  return new Promise((resolve, reject) => {
    if ( !user ) {
      reject('User cannot be empty!');
      return;
    }

    user.password = crypto.createHash('sha256').update(user.password).digest('hex');

    const sql = 'INSERT INTO users SET ?';
    
    connectionDatabase.query(sql, user, async (err, res) => {
      if ( err ) {
        return reject(err.toString());
        return;
      }

      resolve(await get(user.username));
      return;
    });
  }); 
};


exports.login = (username, password) => {
  return new Promise( async (resolve, reject) => {
    try {
      const validPassword = await checkPassword(username, password);
      
      if ( !validPassword ) {
         reject('Invalid password!');
         return;
      }

      resolve(await userHelper.sign({username}));
      return;

    } catch (error) {
      reject(error.toString());
      return;
    }
  });
};
