'use strict';

const pg = require('pg');
require('dotenv').config();
const dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect().catch(err => console.log(err));


function bookRequest(request, response) {
  let id = request.params.id;
  let sql = 'SELECT * FROM books;';
  dbClient.query(sql)
    .then(books => {
      let book = books.rows.filter(book => book.id === parseInt(id));
      let shelves = books.rows.reduce((arr, book) => {
        if (!arr.includes(book.bookshelf)) {
          arr.push(book.bookshelf);
        }
        return arr;
      }, []);
      response.status(200).render('books/show', { book: book[0], bookshelves: shelves });
    // }).catch(error => errorHandler(error, request, response));
    }).catch(error => console.log(error));
}

module.exports.bookRequest = bookRequest;
