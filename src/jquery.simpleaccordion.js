;(function ( $, window, document, undefined ) {

		// Create the defaults once
		var pluginName = "simpleaccordion",
				defaults = {
          prefix: "sa",
          iconOpenClass: "icon-when-open",
          iconClosedClass: "icon-when-closed",
          triggerEvent: "click",
          easing: "swing",
          duration: 800,
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
                // $iconspans = $headers.children("span"),
                $openheader,
                activeClassName = _this.options.prefix + "-active",
                openClassName = _this.options.prefix + "-open";
                openIconClassName = _this.options.iconOpenClass;
                closedIconClassName = _this.options.iconClosedClass;

            // STEP 1: determine open item (default to first)
            $openheader = $headers.filter("."+openClassName);
            if (!$openheader.length) {
              $openheader = $headers.eq(0);
              $openheader.addClass(openClassName);
            }
            $openheader.children("span").addClass(openIconClassName);

            // STEP 2: close other items
            $openheader.siblings("dt").next().slideUp(1);
            $openheader.siblings("dt").children('span').removeClass(openIconClassName).addClass(closedIconClassName);

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
                $last.children('span').removeClass(openIconClassName).addClass(closedIconClassName);
                $which.addClass(openClassName).next().slideDown({
                  duration: _this.options.duration,
                  easing: _this.options.easing,
                  complete: function() {
                    if (typeof _this.options.callback === "function") {
                      _this.options.callback.call($(this).prev("dt"));
                    }
                  }
                });
                $which.children('span').removeClass(closedIconClassName).addClass(openIconClassName);
              }
            });

            // STEP 4: History State?
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
