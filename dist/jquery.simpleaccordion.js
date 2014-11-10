/*
 *  jQuery Simple Accordion - v0.7
 *  A basic accordion widget
 *  https://github.com/placenamehere/simpleaccordion
 *
 *  Made by Chris Casciano
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

		// Create the defaults once
		var pluginName = "simpleaccordion",
				defaults = {
          prefix: "sa",
          triggerEvent: "click",
          easing: "swing",
          duration: 800,
          onInit: null,
          callback: null
        };

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
			this.options = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		Plugin.prototype = {
				init: function () {
						// Place initialization logic here
            var _this = this,
                $el = $(_this.element),
                $headers = $el.children("dt"),
                $openheader,
                activeClassName = _this.options.prefix + "-active",
                openClassName = _this.options.prefix + "-open";

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

              if (!$which.is("."+openClassName)) {
                $last.removeClass(openClassName).next().slideUp({
                  duration: _this.options.duration,
                  easing: _this.options.easing
                });

                $which.addClass(openClassName).next().slideDown({
                  duration: _this.options.duration,
                  easing: _this.options.easing,
                  complete: function() {
                    if (typeof _this.options.callback === "function") {
                      _this.options.callback.call($(this).prev("dt"));
                    }
                  }
                });
              }
            });

            // STEP 4: Run any passed in functions on the element at initialization
            if (typeof _this.options.onInit === "function") {
              _this.options.onInit.call($el);
            }
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
