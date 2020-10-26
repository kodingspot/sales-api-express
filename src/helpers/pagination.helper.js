exports.paginate = (
  request, 
  payload, 
  sql, 
  total, 
  connector, 
  perPage=3
) => {
  /**
   * KodingSpot 2020
   * ===============
   * which is designed the same as the Django 
   * Rest Framework pagination using the URL 
   * Page Number Pagination.
   */
  const page = ( request.query.page ) ? parseInt(request.query.page) : 1;
  const start = ( page > 1 ) ? ( page * perPage ) - perPage : 0;
  const querySQL =`${sql} LIMIT ${start}, ${perPage}`;
  const limit = Math.ceil(total/perPage);
  const url = new URL(
    request.protocol + 
    '://' + 
    request.get('host') + 
    request.originalUrl
  );

  let next = null;
  let previous = null;
  
  const setValue = (value) => {
    const searchParams = url.searchParams;
    searchParams.set('page', value);
    url.search = searchParams.toString();
    return url.toString();
  };

  return new Promise((resolve, reject) => {
    try {

      if ( page + 1 <= limit ) {
        next = setValue(page + 1);
      } else {
        next = null;
      }
      
      if ( page - 1 > 0 ) {
        previous = setValue(page - 1);
      } else {
        previous = null;
      }
      
      if ( page > limit && total > 0 ) {
        reject('Not Found');
      }
  
      connector.query(querySQL, payload, (err, res) => {
        if ( err ) { reject(err); }
  
        resolve({
          count: total || 0,
          next: next,
          previous: previous,
          results: res,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};