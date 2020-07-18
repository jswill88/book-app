'use strict';

const express = require('express');
const methodOverride = require('method-override');
require('dotenv').config();
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
const error = require('./modules/error');

app.route('/').get(home.renderHomePage);
app.route('/bookshelf').put(bookshelf.displayBookshelf);
app.route('/searches/new').get(search.searchForm);
app.route('/searches').post(search.getBooksFromAPI);
app.route('/books').post(add.addToDatabase);
app.route('/books/:id').get(request.bookRequest);
app.route('/update/:books_id').put(update.updateBooks);
app.route('/delete/:id').delete(remove.deleteBook);
app.route('*').get(error.errorPage);
app.route('/error').get(error.errorPage);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
