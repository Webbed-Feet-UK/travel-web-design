define('animations', [], function () {
    'use strict';

    // Define the module
    var module = {

        // Run once when module is first loaded
        // Define variables for timelines and stuff here
        initialize: function(){
            debug('module.initialize() (scrollmagic.js)', 'module');

            this.whatever = 'string';

        },

        // Run every time viewport is resized
        resize: function() {
            debug('module.resize() (scrollmagic.js)', 'module');

            this.whatever = 'resized!';

        },

        // Run once when module is being removed / overwritten
        // Remove timelines and other variables here
        destroy: function() {
            debug('module.destroy() (scrollmagic.js)', 'module');

            this.whatever = null;

        },

    }

    return module;
});
