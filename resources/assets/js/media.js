define('media', [], function () {
    'use strict';

    // Define the module
    var module = {

        // Run once when module is first loaded
        // Define variables for timelines and stuff here
        initialize: function(){
            debug('module.initialize() (media.js)', 'module');

            // load HTML
            this.html = this.getTemplates(document.documentElement.clientWidth);

            // variable to hold boolean values - tells us if we've init'd a template before or not.
            this.initialised = {
                video: false,
            };

            this.initMedia();

        },

        // Run every time viewport is resized
        resize: function(width, newBreakPoint) {
            debug('module.resize() (media.js)', 'module');

            this.initMedia();

        },

        // Run once when module is being removed / overwritten
        // Remove timelines and other variables here
        destroy: function() {
            debug('module.destroy() (media.js)', 'module');


        },


        // Loads the HTML from templates based on config
        getTemplates: function(clientWidth) {
            debug('module.getTemplates() (media.js)', 'module');

            var object = {};

            // For each config entry...
            templates.forEach(function(template, key) {
                // ... find the ID and load HTML from template
                if (!template.maxWidth || template.maxWidth >= clientWidth) {
                    object[template.title] = document.getElementById(template.id).innerHTML;
                }
            });

            return object;
        },


        initMedia: function() {
            debug('module.initMedia() (media.js)', 'module');

            var width = document.documentElement.clientWidth;

            // Check if we've already initialised
            if (!this.initialised.video) {

                if (width > 768) {
                    document.getElementById("md_video").innerHTML = this.html.video;
                    this.initialised.video = true;
                } else {
                    document.getElementById("md_video").innerHTML = '';
                }

            }


        },

    }

    return module;
});
