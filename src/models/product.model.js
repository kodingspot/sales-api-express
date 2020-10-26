const connectionDatabase = require('../databases/connection.database');

exports.all = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM product';
    connectionDatabase.query(query, (err, res) => {
      if ( err ) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};