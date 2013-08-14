/*!
 * Simple Accordion
 *
 * Copyright (c) Chris Casciano
 */

/*
 * Simple Accordion is a jQuery plugin that enables a simple accordion
 * interaction.
 *
 * Authors        Chris Casciano
 */

 /*
  * TODO:
  * # mess with history/location state?
*/

jQuery.extend( jQuery.easing, {
  saEase: function (x, t, b, c, d) {
    // easeOutExpo - https://github.com/gdsmith/jquery.easing
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;

  }
});

(function($) {
  'use strict';

  $.fn.simpleaccordion = function(o){
    //o = $.extend({}, $.fn.simpleaccordion.defaults, o);

    return this.each(function(i, el){
      var $el = $(el),
          $headers = $el.children('dt'),
          // $childs = $el.children(),
          $openheader;


      // STEP 1: determine open item (default to first)
      $openheader = $headers.filter('.sa-open');
      if (!$openheader.length) {
        $openheader = $headers.eq(0);
        $openheader.addClass('sa-open');
      }

      // STEP 2: close other items
      $el.addClass('sa-active');
      $openheader.siblings('dt').next().slideUp(1);

      // STEP 3: watch click events for swapping
      $headers.on('click',function(e) {
        var $this = $(this),
            $last = $(this).siblings('.sa-open');

        e.preventDefault();

        $last.removeClass('sa-open').next().slideUp({ duration: 800, easing: 'saEase' });
        $this.addClass('sa-open').next().slideDown({ duration: 800, easing: 'saEase' });
      });

      // STEP 4: History State?


    });
  }
}(jQuery));
