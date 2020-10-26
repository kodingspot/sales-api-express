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
    }

    const sql = 'INSERT INTO product SET ?';

    connectionDatabase.query(sql, product, (err, res) => {
      /**
       * When the query encountered an error
       */
      if ( err ) {
        reject(err);
      }

      resolve({product_id: res.insertId, ...product});
    });
  });
}