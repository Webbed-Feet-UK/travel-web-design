// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


/*  Debug
    -----------------------------------------------
    A function for outputting to the console
*/
var debug = function(message, type, object) {

    // Setup some default values
    enable_debug = typeof enable_debug !== 'undefined' ? enable_debug : false;
    object = typeof object !== 'undefined' ? object : false;
    message = typeof message !== 'undefined' ? message : 'Debug';
    type = typeof type !== 'undefined' ? type : false;


    // If a cookie called 'debug' is set, then all messages will be displayed
    var getDebugCookie = function() {
        var value = "; " + document.cookie;
        var parts = value.split("; debug=");

        if (parts.length == 2) {
            return true;
        } else {
            return false;
        }
    }
    var cookie_overide = getDebugCookie();


    // Check if debugging is enabled
    if (enable_debug != false || cookie_overide) {

        if (enable_debug.all != false || cookie_overide) {

            // Check if type of message is enabled
            if ( (type != false && enable_debug[type] != false) || (type == false && enable_debug.typeless == true) || cookie_overide) {

                // Do we wrap object in details?

                if (type != false) {

                    if (object !== false) {
                        console.log(type, '"' + message + '"', object);
                    } else {
                        console.log(type, '"' + message + '"');
                    }

                } else {

                    if (object !== false) {
                        console.log(message, object);
                    } else {
                        console.log(message);
                    }
                }

            }
        }
    }
}


/*  Browser Detection
    -----------------------------------------------
*/

var BrowserDetect = {

    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },

    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [
        {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
        {string: navigator.userAgent, subString: "Opera", identity: "Opera"},
        {string: navigator.userAgent, subString: "OPR", identity: "Opera"},

        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
        {string: navigator.userAgent, subString: "Safari", identity: "Safari"}
    ]
};

BrowserDetect.init();


/*  Resize functions
    -----------------------------------------------
    Recalculate stuff when viewport resized.
    Includes timer to prevent constant window resizing from destroying CPU.
*/

var rtime;
var timeout = false;
var delta = 200;
var viewportWidth = document.documentElement.clientWidth;
var viewportHeight = document.documentElement.clientHeight;

window.onresize = function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
};

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;

        var newViewportWidth = document.documentElement.clientWidth;
        var newViewportHeight = document.documentElement.clientHeight;

        if (viewportWidth != newViewportWidth && viewportHeight != newViewportHeight) {
            resizeFunctions(viewportWidth, newViewportWidth, {y: true, x: true});
        } else if (viewportWidth != newViewportWidth && viewportHeight == newViewportHeight) {
            resizeFunctions(viewportWidth, newViewportWidth, {y: false, x: true});
        } else if (viewportWidth == newViewportWidth && viewportHeight != newViewportHeight) {
            resizeFunctions(viewportWidth, newViewportWidth, {y: true, x: false});
        }

        viewportWidth = newViewportWidth;
        viewportHeight = newViewportHeight;
    }
}


// Find the array position of breakpoint
function findBreakpoint(width) {
    debug('findBreakpoint', 'require', width);
    for (var i=0; i < breakpoints.length; i++) {
        if (width -1 >= breakpoints[i].width) {
            debug('findBreakpoint', 'require', breakpoints[i].width);
            return breakpoints[i].width;
            break;
        }
    }

}


// Return paths to js files for requireJS based on screen width
function getDependencies(width) {

    // Set the screen width to small
    if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version < 10) {
        return {animations: 'animations'}
    }

    for (var i=0; i < breakpoints.length; i++) {
        if (width -1 >= breakpoints[i].width){
            debug('getRequireJSPaths', 'require', breakpoints[i].paths);
            return breakpoints[i].dependencies;
            break;
        }
    }

}


// Performs certain functions depending upon screen width
function resizeFunctions(oldWidth, newWidth, dimension) {

    var positioning = require('positioning');

    var deps = getDependencies(oldWidth);
    var animations = require(deps.animations);


    // Check if we have moved from one breakpoint to another
    if (findBreakpoint(oldWidth) != findBreakpoint(newWidth)) {

        debug('Breakpoint transition detected, reloading Modules', 'require');
        // The two breakpoints are different, load the appropriate animations script

        animations.disable();

        if (newWidth <= 768) {

            require(['require', 'animations'], function (require) {
                var animations = require('animations');
                animations.initialize();
            });

        } else {

            require(['require', 'animations@md'], function (require) {
                var animations = require('animations@md');
                if (animations.initialized) {
                    animations.enable();
                    animations.resize(newWidth, dimension);
                } else {
                    animations.initialize();
                }
            });

        }

        positioning.resize(newWidth, dimension);

    } else {
        // If we are still within the same breakpoint, just run the resize method
        animations.resize(newWidth, dimension);
        positioning.resize(newWidth, dimension);
    }

}






// Initial setup
function init() {

    // Configure require for the first time
    require.config({
        paths: {
            TweenMax: 'vendor/greensock/TweenMax.min',
            TweenLite: 'vendor/greensock/TweenMax.min',
            TimelineMax: 'vendor/greensock/TimelineMax.min',
            TweenLite: 'vendor/greensock/TweenLite.min',
            TimelineLite: 'vendor/greensock/TimelineMax.min',
            ScrollMagic: 'vendor/scrollmagic/ScrollMagic.min',
            "ScrollMagic.gsap": 'vendor/scrollmagic/plugins/animation.gsap.min',
            //"ScrollMagic.debug": 'vendor/scrollmagic/plugins/debug.addIndicators.min',
            "gsap.cssPlugin": 'vendor/greensock/plugins/CSSPlugin.min',
        }
    });

    var deps = getDependencies(document.documentElement.clientWidth);

    // Require all the dependencies we need, and initialise them
    require(['positioning', deps.animations], function (positioning, animations) {
        positioning.initialize();
        animations.initialize();
    });

}

// Run initial setup function
init();

