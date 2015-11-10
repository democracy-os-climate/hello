'use strict';
jQuery(document).ready(function($) {
  // Inside of this function, $() will work as an alias for jQuery()
  // and other libraries also using $ will not be accessible under this shortcut
  var fixedNavBar = $('.sticky-row');

  if (fixedNavBar.length) {
    fixedNavBar.affix({
      offset: {
        top: $('.sticky-row').offset().top - $('.sticky-row').height(),
        bottom: $('footer').outerHeight(true),
      },
    });

    fixedNavBar.on('affix.bs.affix', function(e) {
      var currentOffset = parseInt($('.has-navbar-top').css('padding-top'), 10);
      // console.log('affix.bs.affix : ');
      // console.debug(e);
      // console.log('old : ' + currentOffset );
      // console.log('delta : ' + $(e.target).outerHeight(false) );
      // console.log('new : ' + currentOffset + $(e.target).outerHeight(false) );
      $('.has-navbar-top').css('padding-top', (currentOffset + $(e.target).outerHeight(false)) + 'px' );
    });

    fixedNavBar.on('affix-top.bs.affix', function(e) {
      var currentOffset = parseInt($('.has-navbar-top').css('padding-top'), 10);
      // console.log('affix-top.bs.affix : ');
      // console.debug(e);
      // console.log('old : ' + currentOffset );
      // console.log('delta : ' + $(e.target).outerHeight(false) );
      // console.log('new : ' + currentOffset - $(e.target).outerHeight(false) );
      $('.has-navbar-top').css('padding-top', ( currentOffset - $(e.target).outerHeight(false) ) + 'px' );
    });
  }
});
