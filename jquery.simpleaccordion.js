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
  * # decide if we're using jquery animation instead of CSS max-height
*/

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

      // STEP 3: watch click events for swapping
      $headers.on('click',function(e) {
        var $this = $(this);

        e.preventDefault();

        $this.siblings('dt').removeClass('sa-open');
        $this.addClass('sa-open');
      });

      // STEP 4: History State?


    });
  }
}(jQuery));