'use strict';
var fixedNavBar = $('.navbar-sticky').affix({
  offset: {
    top: $('.navbar-sticky').offset().top - $('.navbar-sticky').height(),
    bottom: $('footer').outerHeight(true),
  },
});

fixedNavBar.on('affix.bs.affix', function (e){
  console.log('affix.bs.affix : ');
  console.debug(e);
  var currentOffset = parseInt($('.has-navbar-top').css('padding-top'), 10);
  console.log('old : ' + currentOffset );
  console.log('delta : ' + $(e.target).outerHeight(false) );
  console.log('new : ' + currentOffset + $(e.target).outerHeight(false) );
  $('.has-navbar-top').css('padding-top', (currentOffset + $(e.target).outerHeight(false)) + 'px' );
});

fixedNavBar.on('affix-top.bs.affix', function (e){
  console.log('affix-top.bs.affix : ');
  console.debug(e);
  var currentOffset = parseInt($('.has-navbar-top').css('padding-top'), 10);
  console.log('old : ' + currentOffset );
  console.log('delta : ' + $(e.target).outerHeight(false) );
  console.log('new : ' + currentOffset - $(e.target).outerHeight(false) );
  $('.has-navbar-top').css('padding-top', ( currentOffset - $(e.target).outerHeight(false) ) + 'px' );
});
