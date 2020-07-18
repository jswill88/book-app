'use strict';

const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();
const dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect().catch(error => errorHandler(error));

function searchForm(request, response) {
  response.status(200).render('searches/new');
}

function getBooksFromAPI(request, response) {
  let query = request.body.search;
  let titleorAuthor = request.body.titleAuthor;
  let url = `https://www.googleapis.com/books/v1/volumes?q=+in${titleorAuthor}:${query}`;
  superagent.get(url)
    .then(results => {
      let bookArray = results.body.items;
      let totalBookArray = bookArray.map(book => new Book(book.volumeInfo));
      let sql = 'SELECT DISTINCT bookshelf FROM books;';
      dbClient.query(sql)
        .then(results => {
          let bookshelves = results.rows;
          response.render('searches/show', { searchResults: totalBookArray, bookshelves: bookshelves });
        });
    }).catch(error => errorHandler(error, request, response));
}

function Book(obj) {
  this.title = obj.title || 'Title not available';
  this.authors = obj.authors || 'Author not available';
  this.image_url = obj.imageLinks.thumbnail ? obj.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg';
  this.description = obj.description || 'Description not available';
  this.isbn = obj.industryIdentifiers[0].identifier || 'ISBN not available';
  this.bookshelf = obj.bookshelf || '';
}

function errorHandler(error, request, response) {
  console.error(error);
  response.status(500).redirect('/error');
}

module.exports.searchForm = searchForm;
module.exports.getBooksFromAPI = getBooksFromAPI;
