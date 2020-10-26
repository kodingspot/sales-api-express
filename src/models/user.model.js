const crypto = require('crypto');
const jwtHelper = require('../helpers/jwt.helper');
const connectionDatabase = require('../databases/connection.database');


const get = exports.get = (username) => {
  return new Promise((resolve, reject) => {
    if ( !username ) {
      reject('Username cannot be empty!');
    }

    const sql = 'SELECT * FROM user WHERE username = ?';
    connectionDatabase.query(sql, username, (err, res) => {
      if ( err ) {
        reject(err.toString());
      }

      if ( res.length <= 0 ) {
        reject('Username not found in user!');
      }

      resolve(res[0]);
    });
  });
};


const checkPassword = exports.checkPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    if (!username || !passwords) {
      reject('Username or password cannot be empty!');
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
      }

      if ( res.length <= 0 ) {
        resolve(false);
      }

      resolve(true);
    });
  })
};


exports.register = (user) => {
  return new Promise((resolve, reject) => {
    if ( !user ) {
      reject('User cannot be empty!');
    }

    user.password = crypto.createHash('sha256').update(user.password).digest('hex');

    const sql = 'INSERT INTO users SET ?';
    
    connectionDatabase.query(sql, user, async (err, res) => {
      if ( err ) {
        return reject(err.toString());
      }

      resolve(await get(user.username));
    });
  }); 
};


exports.login = (username, password) => {
  return new Promise( async (resolve, reject) => {
    try {
      const validPassword = await checkPassword(username, password);
      
      if ( !validPassword ) {
         reject({error: 'Invalid password!'});
      }

      resolve({token: await jwtHelper.sign({username})});

    } catch (error) {
      reject({error: error.toString()});
    }
  });
};



