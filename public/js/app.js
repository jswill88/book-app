'use strict';

$(document).ready(function () {
  $('[action^="/update"]').hide();
  let stickyNav = $('nav').offset().top;
  console.log(stickyNav);
  $(window).scroll(() => {
    console.log($(window).scrollTop);
    if ($(window).scrollTop() > stickyNav + 20) {
      $('nav').css('position','fixed').css('top','0');
    } else {
      $('nav').css('position','static');
    }
  });
});
$('#edit').click(()=> {
  $('.book-section').slideUp(1000);
  $('[action^="/update"]').slideDown(1000);
  $('#edit').hide();
});
