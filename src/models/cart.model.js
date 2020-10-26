const connectionDatabase = require('../databases/connection.database');
const productModel = require('./product.model');


const get = exports.get = (user, cart_id) => {
  return new Promise((resolve, reject) => {
    try {
      if ( !user ) {
        reject('User required!');
        return;
      }

      if ( !cart_id ) {
        reject('Cart id required!');
        return;
      }

      const sql = 'SELECT * FROM cart WHERE username = ? AND cart_id = ?';
      const payload = [
        user.username,
        cart_id
      ];

      connectionDatabase.query(sql, payload, (err, res) => {
        if ( err ) {
          reject(err.toString());
          return;
        }

        if ( res.length <= 0 ) {
          reject('Cart not found in table!');
          return;
        }

        resolve(res[0]);
        return;
      });
    } catch (error) {
      reject(error.toString());
      return;
    }
  });
};


exports.create = (user, cart) => {
  return new Promise(async (resolve, reject) => {
    try {
      if ( !cart ) {
        reject('Cart id is required!');
        return;
      }

      const product = await productModel.get(cart.product_id);
      
      let sql = 'INSERT INTO cart SET ';
          sql += '(?, ?, ?, ?, ?, ?, ?, ?)';

      /**
       * Simple validate quantity product
       */
      if ( product.quantity - cart.request_quantity <= 0) {
        reject('Insufficient stock!');
        return;
      }


      const payload = [
        null, // Auto Increment we defined null
        user.username,
        product.product_id,
        product.title,
        product.price,
        product.quantity,
        cart.request_quantity,
        cart.request_quantity * product.price
      ];

      connectionDatabase.query(sql, payload, async (err, res) => {
        if ( err ) {
          reject(err);
          return;
        }

        resolve(await get(user, res.insertId));
        return;
      });

    } catch (error) {
      reject(error);
      return;
    }
  });
};