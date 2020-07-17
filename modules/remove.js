'use strict';

const pg = require('pg');
const dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect().catch(err => console.log(err));

function deleteBook(request, response) {
  let deleteId = request.params.id;
  let sql = 'DELETE FROM books WHERE id = $1;';
  let safeValue = [deleteId];
  dbClient.query(sql, safeValue)
    .then(() =>
      response.status(200).redirect('/'))
    // .catch(error => errorHandler(error, request, response));
    .catch(err => console.log(err));
}

module.exports.deleteBook = deleteBook;