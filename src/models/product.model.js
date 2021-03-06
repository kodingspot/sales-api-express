const connectionDatabase = require('../databases/connection.database');
const paginationHelper = require('../helpers/pagination.helper');


exports.all = (req) => {
  return new Promise((resolve, reject) => {
    let sql = null;
    let payload = null;

    if ( req.query && req.query.search ) {
      /**
       * Search feature implementation
       */
      sql = 'SELECT * FROM product '
      sql += 'WHERE title LIKE ?';
      payload = `%${req.query.search}%`;
    } else if ( 
      req.query && 
      req.query.product_id && 
      req.query.title && 
      req.query.price ) {
      /**
       * Filter feature implementation
       */
      sql = 'SELECT * FROM product WHERE ';
      sql += 'product_id LIKE ? ';
      sql += 'AND (title LIKE ? AND description LIKE ?)';
      payload = [
        `%${req.query.product_id}%`,
        `%${req.query.title}%`,
        `%${req.query.price}%`
      ];
    } else {
      /**
       * Standard result when no filter and search
       */
      sql = 'SELECT * FROM product';
    }

    connectionDatabase.query(sql, payload, (err, res) => {
      if ( err ) { reject(err) }
      const total = res ? res.length : 0;
      /**
       * Pagination feature implementation
       */
      resolve(paginationHelper.paginate(
        req, 
        payload, 
        sql, 
        total, 
        connectionDatabase
      ));
    });
  });
};


exports.create = (product) => {
  return new Promise((resolve, reject) => {
    /**
     * simple validation for the product payload
     */
    if ( !product ) {
      reject('Data cannot be empty!');
      return;
    }

    const sql = 'INSERT INTO product SET ?';

    connectionDatabase.query(sql, product, (err, res) => {
      /**
       * When the query encountered an error
       */
      if ( err ) {
        reject(err);
        return;
      }

      resolve({product_id: res.insertId, ...product});
      return;
    });
  });
};


exports.get = (product_id) => {
  return new Promise((resolve, reject) => {
    /**
     * simple validation for the product id
     */
    if ( !product_id ) {
      reject('Product id cannot be empty!');
      return;
    }

    const sql = 'SELECT * FROM product WHERE product_id = ?';

    connectionDatabase.query(sql, product_id, (err, res) => {
      /**
       * When the query encountered an error
       */
      if ( err ) {
        reject(err);
        return;
      }

      /**
       * When the product id is not in the table
       */
      if ( res.length <= 0) {
        reject('Product ID not found in product!');
        return;
      }
      
      resolve(res[0]);
      return;
    });
  });
};


exports.update = (product_id, product) => {
  return new Promise((resolve, reject) => {
    /**
     * simple validation for the product payload
     */
    if ( !product_id || !product ) {
      reject('Data or id product cannot be empty!');
      return;
    }

    let sql = 'UPDATE product SET ';
        sql += 'title = ?, description = ?, price = ?, quantity = ?, unit = ? WHERE product_id = ?';
    
    const payloads = [
      product.title,
      product.description,
      product.price,
      product.quantity,
      product.unit,
      product_id
    ];

    connectionDatabase.query(sql, payloads, (err, res) => {
      /**
       * When the query encountered an error
       */
      if ( err ) {
        reject(err);
        return;
      }

      /**
       * When the product id is not in the table
       */
      if ( res.affectedRows === 0 ) {
        reject('Product ID not found in product!');
        return;
      }

      resolve({product_id, ...product});
      return;
    });
  });
};


exports.delete = (product_id) => {
  return new Promise((resolve, reject) => {
    /**
     * simple validation for the product payload
     */
    if ( !product_id ) {
      reject('Product id cannot be empty!');
      return;
    }

    const sql = 'DELETE FROM product WHERE product_id = ?'

    connectionDatabase.query(sql, product_id, (err, res) => {
      /**
       * When the query encountered an error
       */
      if ( err ) {
        reject(err);
        return;
      }

      /**
       * When the product id is not in the table
       */
      if ( res.affectedRows === 0 ) {
        reject('Product ID not found in product!');
        return;
      }

      /**
       * The 204 (No Content) status code indicates that the 
       * server has successfully fulfilled the request and that 
       * there is no additional content to send in the response 
       * payload body.
       * 
       * Link: https://tools.ietf.org/html/rfc7231#section-6.3.5
       */
      resolve(null);
      return;
    });
  });
};


