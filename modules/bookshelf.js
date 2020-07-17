'use strict';

const pg = require('pg');
require('dotenv').config();
const dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect().catch(err => console.log(err));

function displayBookshelf(request, response) {
  let sortBy = Object.keys(request.body)[0];
  const authorOrBookshelf = request.body[sortBy];
  let sql = `SELECT DISTINCT id, title, authors, image_url, description, isbn, bookshelf FROM books WHERE ${sortBy}=$1;`;
  let safeValue = [authorOrBookshelf];
  dbClient.query(sql, safeValue)
    .then(databaseSearchResults => {
      response.render('pages/bookshelf', { homeArray: databaseSearchResults.rows, which: sortBy });
    }).catch(error => errorHandler(error, request, response));
}

module.exports.displayBookshelf = displayBookshelf;
