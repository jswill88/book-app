'use strict';

const pg = require('pg');
require('dotenv').config();
const dbClient = new pg.Client(process.env.DATABASE_URL);
const jsonData = require('../data/initial.json');
dbClient.connect().catch(err => console.log(err));

function renderHomePage(request, response) {
  let sql = 'SELECT * FROM books;';
  dbClient.query(sql)
    .then(databaseSearchResults => {
      if (!databaseSearchResults.rows.length) {
        let sql = 'INSERT INTO books (title, authors, image_url, description, isbn, bookshelf) values ($1, $2, $3, $4, $5, $6);';
        let firstBooks = jsonData.map(book => new Book(book));
        firstBooks
          .forEach(book => {
            let safeValues = Object.values(book);
            dbClient.query(sql, safeValues);
          });
        response.status(200).render('pages/index', { homeArray: firstBooks });
      } else {
        response.status(200).render('pages/index', { homeArray: databaseSearchResults.rows });
      }
    // }).catch(error => errorHandler(error, request, response));
    }).catch(error => console.log(error));
}

function Book(obj) {
  this.title = obj.title || 'Title not available';
  this.authors = obj.authors || 'Author not available';
  this.image_url = obj.imageLinks.thumbnail ? obj.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg';
  this.description = obj.description || 'Description not available';
  this.isbn = obj.industryIdentifiers[0].identifier || 'ISBN not available';
  this.bookshelf = obj.bookshelf || '';
}

module.exports.renderHomePage = renderHomePage;
