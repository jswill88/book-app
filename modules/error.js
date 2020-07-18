'use strict';

function errorPage(request, response) {
  response.status(404).render('pages/error');
}

module.exports.errorPage = errorPage;
