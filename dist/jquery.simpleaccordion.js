/*
 *  jQuery Simple Accordion - v0.5
 *  A basic accordion widget
 *  https://github.com/placenamehere/simpleaccordion
 *
 *  Made by Chris Casciano
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "simpleaccordion",
				defaults = {
          prefix: "sa",
          triggerEvent: "click",
          easing: "swing"
        };

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.options = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		Plugin.prototype = {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.options
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.options).

            var _this = this,
                $el = $(_this.element),
                $headers = $el.children("dt"),
                $openheader,
                activeClassName = _this.options.prefix + "-active",
                openClassName = _this.options.prefix + "-open",
                heightDataAttr = _this.options.prefix + "-original-height";

            // STEP 0: save initial drawn height of each accordion content
            $el.children("dd").map(function() {
              $(this).data(heightDataAttr,$(this).height());
            });

            // STEP 1: determine open item (default to first)
            $openheader = $headers.filter("."+openClassName);
            if (!$openheader.length) {
              $openheader = $headers.eq(0);
              $openheader.addClass(openClassName);
            }

            // STEP 2: close other items
            $openheader.siblings("dt").next().slideUp(1);

            // widget now considered activated
            $el.addClass(activeClassName);

            // STEP 3: watch click events for swapping
            $headers.on(_this.options.triggerEvent,function(e) {
              var $which = $(this),
                  $last = $(this).siblings("."+openClassName);

              e.preventDefault();


              $last.removeClass(openClassName).next().slideUp({ duration: 800, easing: _this.options.easing });
              $which.addClass(openClassName).next().slideDown({ duration: 800, easing: _this.options.easing });
            });

            // STEP 4: History State?


				// },
				// open: function (e) {
				// 		e.preventDefault();
				}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
