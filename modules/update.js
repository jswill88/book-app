'use strict';

const pg = require('pg');
const dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect().catch(err => console.log(err));


function updateBooks(request, response) {
  let { title, authors, description, image_url, isbn, bookshelf } = request.body;
  let sql = 'UPDATE books SET authors=$1, title=$2, isbn=$3, image_url=$4, description=$5, bookshelf=$6 WHERE id=$7;';
  let booksId = request.params.books_id;
  let safeValues = [authors, title, isbn, image_url, description, bookshelf, booksId];
  dbClient.query(sql, safeValues)
    .then(() => {
      response.status(200).redirect(`/books/${booksId}`);
    // }).catch(error => errorHandler(error, request, response));
    }).catch(err => console.log(err));
}

module.exports.updateBooks = updateBooks;
