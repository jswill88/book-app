'use strict';

const pg = require('pg');
require('dotenv').config();
const dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect().catch(error => errorHandler(error));

function addToDatabase(request, response) {
  let sql = 'SELECT * FROM books WHERE isbn = $1;';
  let safeValue = [request.body.isbn];
  dbClient.query(sql, safeValue)
    .then(result => {
      if (!result.rowCount) {
        let { title, authors, image_url, description, isbn, bookshelf } = request.body;
        let sqlAdd = 'INSERT INTO books (title, authors, image_url, description, isbn, bookshelf) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
        let safeValues = [title, authors, image_url, description, isbn, bookshelf];
        dbClient.query(sqlAdd, safeValues)
          .then(store => {
            let id = store.rows[0].id;
            response.status(200).redirect(`/books/${id}`);
          }).catch(error => errorHandler(error, request, response));
      } else {
        response.status(200).redirect(`/books/${result.rows[0].id}`);
      }
    });
}

function errorHandler(error, request, response) {
  console.error(error);
  response.status(500).redirect('/error');
}

module.exports.addToDatabase = addToDatabase;
