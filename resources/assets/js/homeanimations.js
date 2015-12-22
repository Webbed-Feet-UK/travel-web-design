define('homeanimations', ['TweenLite', 'gsap.cssPlugin'], function (TweenLite) {
    'use strict';

    var module = {

        initialize: function(){
            debug('module.initialize() (home-animations.js)', 'module');

            // Set the nav based on status
            this.setNav();

            // Setup the event listeners
            document.getElementById("js_nav_button").addEventListener("click", this.toggleNav);

            var menuItems = document.querySelectorAll('.js-navlink');
            for (var i=0; i < menuItems.length; i++) {
                menuItems[i].addEventListener("click", this.toggleNav);
            }

            this.initialized = true;

        },

        enable: function(){
            debug('module.enable() (home-animations.js)', 'module');
            this.initialize();
        },


        disable: function() {
            debug('module.disable() (home-animations.js)', 'module');
            this.destroy();
        },


        destroy: function() {
            debug('module.disable() (home-animations.js)', 'module');

            // Destroy event listeners & remove styles
            var menuItems = document.querySelectorAll('.js-navlink');
            for (var i=0; i < menuItems.length; i++) {
                menuItems[i].removeEventListener("click", this.toggleNav);
            }

            document.getElementById("js_nav_button").removeEventListener('click', this.toggleNav);
            document.getElementById("js_nav").removeAttribute("style");

        },


        resize: function() {
            debug('module.resize() (home-animations.js)', 'module');
        },


        // Sets the display of the navigation based on data-open attribute value
        setNav: function() {
            debug('module.setNav() (home-animations.js)', 'module');

            if (document.getElementById("js_nav").getAttribute("data-open") == 'true') {
                console.log(TweenLite);
                this.tweenNavToggle = TweenLite.to('#js_nav', 0.3, {autoAlpha: 1, display:'block'});
            } else {
                this.tweenNavToggle = TweenLite.to('#js_nav' , 0.3, {autoAlpha: 0, display:'none'});
            }

        },

        // Toggles the display of the navigation
        toggleNav: function() {
            debug('module.toggleNav() (home-animations.js)', 'module');

            if (document.getElementById("js_nav").getAttribute("data-open") == 'true') {
                // Nav is open so close it
                this.tweenNavToggle = TweenLite.to('#js_nav' , 0.3, {autoAlpha: 0, display:'none'});
                document.getElementById("js_nav").setAttribute("data-open", 'false');
            } else {
                this.tweenNavToggle = TweenLite.to('#js_nav', 0.3, {autoAlpha: 1, display:'block'});
                document.getElementById("js_nav").setAttribute("data-open", 'true');
            }

        },

    }

    return module;
});
