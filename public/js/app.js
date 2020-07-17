'use strict';

$(document).ready(function () {
  $('[action^="/update"]').hide();
  let stickyNav = $('nav').offset().top;
  console.log(stickyNav);
  $(window).scroll(() => {
    if ($(window).scrollTop() > stickyNav) {
      $('nav').css('position','fixed').css('top','0');
      $('main').css('padding-top',$('nav').height() + 25);
    } else {
      $('nav').css('position','static');
      $('main').css('padding-top','0');
    }
  });
});
$('#edit').click(()=> {
  $('.book-section').slideUp(350);
  $('[action^="/update"]').slideDown(350);
  $('#edit').hide();
});
