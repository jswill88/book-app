'use strict';

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
require('dotenv').config();
// These need to be after dot env require
const dbClient = new pg.Client(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3001;
const app = express();
require('ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

const home = require('./modules/home');
const bookshelf = require('./modules/bookshelf');
const search = require('./modules/search');
const add = require('./modules/add');
const request = require('./modules/request');
const update = require('./modules/update');
const remove = require('./modules/remove');

app.route('/').get(home.renderHomePage);
app.route('/bookshelf').put(bookshelf.displayBookshelf);
app.route('/searches/new').get(search.searchForm);
app.route('/searches').post(search.getBooksFromAPI);
app.route('/books').post(add.addToDatabase);
app.route('/books/:id').get(request.bookRequest);
app.route('/update/:books_id').put(update.updateBooks);
app.route('/delete/:id').delete(remove.deleteBook);


app.get('/error', errorPage);
app.get('*', errorPage);

function errorPage(request, response) {
  response.status(404).render('pages/error');
}

function errorHandler(error, request, response) {
  console.error(error);
  response.status(500).redirect('/error');
}

dbClient.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  }).catch(error => errorHandler(error));
