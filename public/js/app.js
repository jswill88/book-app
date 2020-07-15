'use strict';


$(document).ready(function () {
  $('[action^="/update"]').hide();
});
$('#edit').click(()=> {
  $('.book-section').slideUp(1000);
  $('[action^="/update"]').slideDown(1000);
  $('#edit').hide();
});
