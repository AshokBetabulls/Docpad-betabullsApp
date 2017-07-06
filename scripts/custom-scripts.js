/*!

 *

 *  Copyright (c) David Bushell | http://dbushell.com/

 *

 */

// Animation Load

setTimeout(function(){

    jQuery(".main-slider.cbp-so-init").addClass("cbp-so-animate");

}, 500);



 

(function(window, document, undefined)

{



    // helper functions



    var trim = function(str)

    {

        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');

    };



    var hasClass = function(el, cn)

    {

        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;

    };



    var addClass = function(el, cn)

    {

        if (!hasClass(el, cn)) {

            el.className = (el.className === '') ? cn : el.className + ' ' + cn;

        }

    };



    var removeClass = function(el, cn)

    {

        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));

    };



    var hasParent = function(el, id)

    {

        if (el) {

            do {

                if (el.id === id) {

                    return true;

                }

                if (el.nodeType === 9) {

                    break;

                }

            }

            while((el = el.parentNode));

        }

        return false;

    };



    // normalize vendor prefixes



    var doc = document.documentElement;



    var transform_prop = window.Modernizr.prefixed('transform'),

        transition_prop = window.Modernizr.prefixed('transition'),

        transition_end = (function() {

            var props = {

                'WebkitTransition' : 'webkitTransitionEnd',

                'MozTransition'    : 'transitionend',

                'OTransition'      : 'oTransitionEnd otransitionend',

                'msTransition'     : 'MSTransitionEnd',

                'transition'       : 'transitionend'

            };

            return props.hasOwnProperty(transition_prop) ? props[transition_prop] : false;

        })();



    window.App = (function()

    {



        var _init = false, app = { };



        var inner = document.getElementById('inner-wrap'),



            nav_open = false,



            nav_class = 'js-nav';





        app.init = function()

        {

            if (_init) {

                return;

            }

            _init = true;



            var closeNavEnd = function(e)

            {

                if (e && e.target === inner) {

                    document.removeEventListener(transition_end, closeNavEnd, false);

                }

                nav_open = false;

            };



            app.closeNav =function()

            {

                if (nav_open) {

                    // close navigation after transition or immediately

                    var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;

                    if (duration > 0) {

                        document.addEventListener(transition_end, closeNavEnd, false);

                    } else {

                        closeNavEnd(null);

                    }

                }

                removeClass(doc, nav_class);

            };



            app.openNav = function()

            {

                if (nav_open) {

                    return;

                }

                addClass(doc, nav_class);

                nav_open = true;

            };



            app.toggleNav = function(e)

            {

                if (nav_open && hasClass(doc, nav_class)) {

                    app.closeNav();

                } else {

                    app.openNav();

                }

                if (e) {

                    e.preventDefault();

                }

            };



            // open nav with main "nav" button

            document.getElementById('nav-open-btn').addEventListener('click', app.toggleNav, false);



            // close nav with main "close" button

            document.getElementById('nav-close-btn').addEventListener('click', app.toggleNav, false);



            // close nav by touching the partial off-screen content

            document.addEventListener('click', function(e)

            {

                if (nav_open && !hasParent(e.target, 'nav')) {

                    e.preventDefault();

                    app.closeNav();

                }

            },

            true);



            addClass(doc, 'js-ready');



        };



        return app;



    })();



    if (window.addEventListener) {

        window.addEventListener('DOMContentLoaded', window.App.init, false);

    }



})(window, window.document);



// Main Slider

// jQuery('.single-item').slick({

//     fade: true

// });





/* function write the script to design select box */

jQuery(document).ready(function() {

    tmpl_add_selectbox_wrapper();

});





function tmpl_add_selectbox_wrapper(){

    jQuery("select").each(function(e){ 

        if(jQuery(this ).parent(".select-wrap").length != 1){

            jQuery(this).wrap( "<div class='select-wrap'></div>" );



        if (!jQuery.browser.opera) {

			var title = jQuery(this).attr('title');

			/*check multiple select attribute if its found then return script */

			if(jQuery(this).attr('multiple')=='multiple'){

				return ;

			}

			var title = jQuery('option:selected',this).text();

			jQuery(this)

				.css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})

				.after('<span class="select">' + title + '</span>')

				.change(function(){

					val = jQuery('option:selected',this).text();

								jQuery(this).next().text(val);

					})

			}

        }

    });

	jQuery(document).on('change',"select", function(e){ 

			var title = jQuery(e.target).attr('title');

			/*check multiple select attribute if its found then return script */

			if(jQuery(e.target).attr('multiple')=='multiple'){

				return ;

			}

			var title = jQuery('option:selected',e.target).text();

			if(jQuery(e.target).next().attr('class') == 'select'){

				jQuery(e.target).next('.select').remove();

			}

			jQuery(e.target)

				.css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})

				.after('<span class="select">' + title + '</span>')

				.change(function(){

					val = jQuery('option:selected',e.target).text();

								jQuery(e.target).next().text(val);

					})

			

    });

}



// Tabs

jQuery(document).ready(function() {

    jQuery(".tabs a").click(function(event) {

        event.preventDefault();

        jQuery(this).parent().addClass("active");

        jQuery(this).parent().siblings().removeClass("active");

        var tab = jQuery(this).attr("href");

        jQuery(".tab-content-inner").not(tab).css("display", "none");

        jQuery(tab).fadeIn();

    });

});