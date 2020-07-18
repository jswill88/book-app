'use strict';

const pg = require('pg');
const dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect().catch(error => errorHandler(error));

function displayBookshelf(request, response) {
  let sortBy = Object.keys(request.body)[0];
  if (!request.body[sortBy]) {
    response.status(200).redirect('/');
  }
  const authorOrBookshelf = request.body[sortBy];
  let sql = `SELECT DISTINCT id, title, authors, image_url, description, isbn, bookshelf FROM books WHERE ${sortBy}=$1;`;
  let safeValue = [authorOrBookshelf];
  dbClient.query(sql, safeValue)
    .then(databaseSearchResults => {
      response.render('pages/bookshelf', { homeArray: databaseSearchResults.rows, which: sortBy });
    }).catch(error => errorHandler(error, request, response));
}

function errorHandler(error, request, response) {
  console.error(error);
  response.status(500).redirect('/error');
}

module.exports.displayBookshelf = displayBookshelf;
