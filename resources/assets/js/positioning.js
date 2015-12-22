define('positioning', [], function () {


// Define methods
var module = {

    initialize: function() {
        debug('module.initialize() (positioning.js)', 'module');
        this.resize();
    },

    run: function() {
        debug('module.run() (positioning.js)', 'module');

    },

    resize: function() {
        debug('module.resize() (positioning.js)', 'module');

        this.calcSectionOffsets();
        this.calcSvgPatterns();
        //this.calcBgPattern();
        //this.calcSvgBgPattern();
    },


    destroy: function() {
        debug("module.destroy() (positioning.js)", "module");
    },


    fadeIn: function() {
        var element = document.getElementsByTagName("body")[0];

        element.className = element.className + " -visible";
    },

    fadeOut: function() {
        var element = document.getElementsByTagName("body")[0];

        var classes = element.className;

        element.className = classes.replace(" -visible", "");
    },

    // Calculate the positioning of the angled section offsets (based on height)
    calcSectionOffsets : function() {

        this.fadeOut();

        // Top
        var elements = document.querySelectorAll('.js-offsetTop');
        for (var i=0; i<elements.length; i++){
            elements[i].style.marginTop = (-Math.abs(elements[i].clientHeight)) + "px";
        }

        // Bottom
        var elements = document.querySelectorAll('.js-offsetBottom');
        for (var i=0; i<elements.length; i++){
            elements[i].style.marginBottom = (-Math.abs(elements[i].clientHeight)) + "px";
        }

        this.fadeIn();

    },


    // Calculate the background pattern scale for full width svg elements. Allows backgrounds to keep the same DPI, regardless of the SVG's scale.
    calcSvgPatterns : function() {
        var svg = document.querySelectorAll('.js-svgPatternTransform')
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var scale = 1140 / w;
        var prop = "scale(" + scale + ")";

        for (var i=0; i<svg.length; i++){
            svg[i].setAttribute("patternTransform", prop);
        }

    },

    // Vertically offset background image based on absolute position - used to align backgrouns images across seperate divs.
    calcBgPattern: function() {
        var elArray = document.querySelectorAll('.js-patternOffset');

        for (var i=0; i<elArray.length; i++){
            //var h = elArray[i].offsetTop;
            var h = this.cumulativeOffset(elArray[i]);
            if (elArray[i].dataset.bgheight != null) {
                var height = elArray[i].dataset.bgheight;
            } else {
                var height = 100;
            }

            var offset = h % height;
            elArray[i].style["background-position-y"] = -Math.abs(offset) + 'px';
        }

    },

    // Vertically offset background image based on absolute position - used to align backgrouns images across seperate divs. SVG version for pattern fills.
    calcSvgBgPattern: function() {
        var svgArray = document.querySelectorAll('.js-svgPatternOffset');


        for (var i=0; i<svgArray.length; i++){

            var pattern = svgArray[i].querySelectorAll('.js-pattern');

            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var scale = 1140 / w;

            var h = this.cumulativeOffset(svgArray[i]);
            var height = 100;

            console.log(h);

            var offset = (h % height);

            console.log(-Math.abs(offset));
            var prop = "scale(" + scale + ") translate(0 " + -Math.abs(offset) + ")";
            pattern[0].setAttribute("patternTransform", prop);
        }

    },

    // Find the absolute position of an element
    cumulativeOffset: function(element) {
        var top = 0, left = 0;
        do {
            top += element.offsetTop  || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while(element);

        return top;
    }

  }

  return module;
});





