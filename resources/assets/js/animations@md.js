define('animations@md', ['ScrollMagic', 'TweenMax', 'TimelineMax', 'ScrollMagic.gsap'], function (ScrollMagic, TweenMax, TimelineMax) {
    'use strict';


// Define module methods
var module = {

    initialize: function() {
        debug('module.initialize() (animations@md.js)', 'module');


        // Let's use an object to collect arrays of all our bits and pieces (So we can DESTROY THEM! STOMP STOMP!)
        // Why do we need this? It's so we can keep a track of all animations that have been initialised and tear them down at the right time (see the destroy() method).
        // That way we won't have any conflicts or legacy animations floating about at the wrong time.
        this.structure = {
            controllers: [], // Scrollmagic Controllers
            scenes: [], // Scrollmagic Scenes
            timelines: [], // GSAP Timelines
            targets: [], // GSAP tween targets (Tags, ID's and classes)
            tweens: []
        }

        this.timelines = {};

        // Add nav items
        this.structure.targets = this.structure.targets.concat(navItems);

        // Init scrollmagic controllers & Timelines
        this.scrollController = new ScrollMagic.Controller();
        this.structure.controllers.push(this.scrollController);

        this.scrollControllerNav = new ScrollMagic.Controller();
        this.structure.controllers.push(this.scrollControllerNav);

        this.timelineNavItems = new TimelineMax();
        this.structure.timelines.push(this.timelineNavItems);

        this.timelineContact = new TimelineMax();
        this.structure.timelines.push(this.timelineContact);

        //this.sceneHero = null;
        //this.structure.scenes.push(this.sceneHero);



        this.offsets = {
            md : -Math.abs(document.documentElement.clientHeight/4),
            sm : -Math.abs(document.documentElement.clientHeight/8)
        }


        // Now that all our globals are setup, initialise the animations
        this.setupAnimations();

        this.initCustomTimelines();

        this.initialized = true;

    },

    setupAnimations: function() {
        debug('module.initAnimations() (animations@md.js)', 'module');


        /*
        // Example animation - Let's describe what's happening:
        this.structure.scenes.push( // Here we are adding the adding the scene to an array so we can keep track of it and destroy it later
            new ScrollMagic.Scene({triggerElement: '#sm_trig_parallax1', triggerHook: "onEnter", duration: "200%"}) // Now we are creating the Scrollmagic Scene - a container which controls the animation (trigger time, duration etc.)
                .setTween("#sm_targ_parallax1", {x: "50%", ease: Linear.easeNone}) // Now we initialise an animation (tween) itself. This is basically a shortcut for GSAP's TweenMax class. Define animation target and properties.
                .addTo(this.scrollController) // Now we add the scene to a Scrollmagic Controller. The controller coordinates our scenes.
        );
        this.structure.targets.push("#sm_targ_parallax1"); // Lastly, we add any tween/animation targets to an array. This is so we can purge any CSS styles that the tween may have set. Prevents styles having an affect at the wrong time (on mobile mode for example).
        */


        // ----------------------- Header
        // ------------------------------------------------------------

        // Animate Header background rotation
        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: "body", triggerHook: "onLeave", offset: 0, duration: "120"})
            	.setTween("#sm_targ_wrapperLogo", {rotation: "0", y: -10, ease: Linear.easeInOut})
                //.addIndicators({name: "Header Anim"}) // add indicators (requires plugin)
            	.addTo(this.scrollController)
        );
        this.structure.targets.push("#sm_targ_wrapperLogo");

        // Animate Header background rotation
        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: "body", triggerHook: "onLeave", offset: 0, duration: "120"})
            	.setTween("#sm_targ_wrapperLogo_bg", {y: -20, ease: Linear.easeInOut})
                .addTo(this.scrollController)
        );
        this.structure.targets.push("#sm_targ_wrapperLogo_bg");

        // Logo Rotation
        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: "body", triggerHook: "onLeave", offset: 0, duration: "120"})
            	.setTween("#sm_targ_logoLink", {rotation: "0", width: 180, marginTop: 0, y: -10, ease: Linear.easeInOut})
            	.addTo(this.scrollController)
        );
        this.structure.targets.push("#sm_targ_logoLink");

        // Navigation (upwards movement)
        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: "body", triggerHook: "onLeave", duration: 120})
                .setTween("#sm_targ_nav", {marginTop: 0, ease: Linear.easeInOut})
                //.addIndicators({name: "Navigation Scroll"}) // add indicators (requires plugin)
                .addTo(this.scrollController)
        );
        this.structure.targets.push("#sm_targ_nav");


        // ----------------------- Hero
        // ------------------------------------------------------------

        // Add keyframe for stagger
        this.timelineContact.add("stagger", "+=1");

        //stagger the animation of all icons with 0.1s between each tween's start time
        //this tween is added
        this.timelineContact.staggerFromTo("#sm_targ_contact", 0.3, {opacity: 0, scale: 6, x: -1920, ease: Linear.easeIn}, {opacity: 1, scale: 1, x: 0, ease: Linear.easeIn}, 0.1, "stagger");
        this.structure.targets.push("#sm_targ_contact");


        // Calculate the navigation animations
        this.calcNavAnimation();


        // ----------------------- Basic Animations
        // ------------------------------------------------------------


        this.animations = [

            // ----------------------- Section 1
            {   // Logotype image
                trigger: '#sm_trig_section1_img1', hook: 'onEnter', offset: 0, duration: '200%',
                target: '#sm_targ_section1_img1', targetDuration: 1,
                props: {opacity: 0, y: 100, scale: 1.5, ease: Power3.easeOut},
            },
            {   // Wing 1
                trigger: '#sm_trig_section1_wing1', hook: null, offset: this.offsets.md, duration: null,
                target: '#sm_targ_section1_wing1', targetDuration: 1,
                props: {x: '100%', rotation: '-=30', opacity: 0, ease: Back.easeOut},
            },
            {   // Wing 2
                trigger: '#sm_trig_section1_wing2', hook: null, offset: this.offsets.md, duration: null,
                target: '#sm_targ_section1_wing2', targetDuration: 1,
                props: {x: '-100%', rotation: '+=30', opacity: 0, ease: Back.easeOut},
            },
            {   // Wing 2 little rotating icon thingy
                trigger: '#sm_trig_section1_wing2', hook: 'onEnter', offset: this.offsets.md, duration: '300%',
                target: '#sm_targ_section1_wing2_img', targetDuration: 1,
                props: {rotation: 720},
            },
            {   // Text 2
                trigger: '#sm_targ_section1_text2', hook: null, offset: this.offsets.sm, duration: null,
                target: '#sm_targ_section1_text2', targetDuration: 1,
                props: {opacity: 0, y: 50, ease: Power3.easeOut},
            },
            {   // Text 3
                trigger: '#sm_targ_section1_text3', hook: null, offset: this.offsets.md, duration: null,
                target: '#sm_targ_section1_text3', targetDuration: 1,
                props: {opacity: 0, y: 50, ease: Power3.easeOut},
            },
            {   // Text 4
                trigger: '#sm_targ_section1_text4', hook: null, offset: this.offsets.md, duration: null,
                target: '#sm_targ_section1_text4', targetDuration: 1,
                props: {opacity: 0, y: 50, ease: Power3.easeOut},
            }
        ]

        // Generate basic animations
        for(var i=0; i<this.animations.length; i++) { // loop through each animation
            var anim = this.animations[i]; // add anim properties to variable for convenience

            anim.props.clearProps = 'all';

            this.structure.scenes.push( // Add scene to structure array (for destruction later)
                new ScrollMagic.Scene({triggerElement: anim.trigger, triggerHook: anim.hook, offset: anim.offset, duration: anim.duration}) // Create the scene
                    .setTween(TweenMax.from(anim.target, anim.targetDuration, anim.props)) // Set the tween
                    .addTo(this.scrollController) // Add to scroll controller
            );
            this.structure.targets.push(anim.target); // Add target to structure array (for destruction later)
        }

        // ----------------------- Advanced Animations
        // ------------------------------------------------------------


    },


    initCustomTimelines: function() {

    },


    removeCustomTimelines: function() {

    },


    resize: function(width, dimension){
        debug('module.resize() (animations@md.js)', 'module');

        this.scrollControllerNav.destroy(true);
        this.timelineNavItems.kill();

        this.timelineNavItems = new TimelineMax();

        // Re-calculate hero trigger offset
        if (dimension.y) {
            this.sceneHero.offset(Math.max(document.documentElement.clientHeight, window.innerHeight || 0)/24 * 15);
        }

        // Re-calculate the navigation animations
        this.calcNavAnimation();

    },


    enable: function() {
        debug('module.enable() (animations@md.js)', 'module');

        for(var i=0; i < this.structure.controllers.length; i++) {
            this.structure.controllers[i].enabled(true);
        }


        for(var i=0; i < this.structure.scenes.length; i++) {
            this.structure.scenes[i].enabled(true);
        }

        this.addPreviousStyles();
        this.initCustomTimelines();

    },


    disable: function(){
        debug('module.disable() (animations@md.js)', 'module');

        // Disable scrollmagic scenes
        for(var i=0; i < this.structure.scenes.length; i++) {
            this.structure.scenes[i].enabled(false);
        }

        setTimeout(function() {
            module.removeStyles()
        }, 200);

        this.removeCustomTimelines();

    },


    removeStyles: function() {
        debug('module.removeStyles() (animations@md.js)', 'module');

        // Loop through all SM targets...
        for(var i=0; i < this.structure.targets.length; i++) {
            var el = document.querySelectorAll(this.structure.targets[i]);
            for (var q=0; q < el.length; q++) {
                el[q].oldStyles = el[q].getAttribute("style");
                el[q].removeAttribute("style");
            }
        }
    },

    addPreviousStyles: function() {
        debug('module.addPreviousStyles() (animations@md.js)', 'module');

        // Loop through all SM targets...
        for(var i=0; i < this.structure.targets.length; i++) {
            var el = document.querySelectorAll(this.structure.targets[i]);
            for (var q=0; q < el.length; q++) {
                // ...and add style properties

                el[q].setAttribute("style", el[q].oldStyles);
            }
        }
    },

    destroy: function(){
        debug('module.destroy() (animations@md.js)', 'module');

        // Loop over all scenes and PURGE THE UNCLEAN
        console.log(this.structure.scenes);


        for(var i=0; i < this.structure.scenes.length; i++) {
            this.structure.scenes[i].destroy(false);
            this.structure.scenes[i] = null; // set to null for garbage collection
        }

        // Destroy scrollmagic controllers
        for(var i=0; i < this.structure.controllers.length; i++) {
            this.structure.controllers[i].destroy(false);
            this.structure.controllers[i] = null; // set to null for garbage collection;
        }

        // Destroy GSAP Timelines
        for(var i=0; i < this.structure.timelines.length; i++) {
            this.structure.timelines[i].kill();
            this.structure.timelines[i] = null; // set to null for garbage collection;
        }

        // Destroy GSAP Tweens
        for(var i=0; i < this.structure.tweens.length; i++) {
            this.structure.tweens[i].kill();
            this.structure.tweens[i] = null; // set to null for garbage collection;
        }

        // Loop through all SM targets...
        this.removeStyles();
    },


    // Calculate the animations for the navigation
    calcNavAnimation: function() {
        debug('module.calcNavAnimation() (animations@md.js)', 'module');

        this.scrollControllerNav = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onLeave", duration: "0", offset: "0"}});

        // Find the maximum width of all nav items
        var maxWidth = function() {
            var width = document.querySelector(navItems[0]).clientWidth;
            navItems.forEach(function(itemId, key) {
                var nextWidth = document.querySelector(itemId).clientWidth;
                if (nextWidth > width) {
                    width = nextWidth;
                }
            });
            return width;
        }


        navItems.forEach(function(itemId, key) {

            // Calculate offsets
            var offsetX = 20; // Offset individual items by this value
            var offsetY = 6; // Offset individual items by this value
            var totalOffset = navItems.length * offsetX;
            var itemOffset = (((key+1) * offsetX) - totalOffset);

            // Calculate the X positioning
            var distanceX = ((document.getElementById("sm_targ_nav").offsetLeft + document.getElementById("sm_targ_nav").clientWidth) - document.querySelector(itemId).offsetLeft) - (maxWidth() - itemOffset);

            // Calculate the Y positioning
            var distanceY = (document.querySelector(itemId).clientHeight + offsetY) * key;

            // Tween the navigation LI tag (position)
            module.timelineNavItems.fromTo(itemId, 1,
                {x: distanceX, y: distanceY},
                {x: 0, y:0, ease: Back.easeInOut},
                0
            )

            module.timelineNavItems.fromTo(itemId + ' a', 1,
                {borderLeftWidth: "10"},
                {borderLeftWidth: "4", ease: Linear.easeInOut},
                0
            )

            module.structure.targets.push(itemId);

        });


        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: "#sm_trig_nav"})
    		    .setTween(this.timelineNavItems) // trigger a TweenMax.to tween
                //.addIndicators({name: "Navigation Anim"}) // add indicators (requires plugin)
                .addTo(this.scrollControllerNav)
        );

        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: "#sm_trig_nav"})
    		    .setTween(this.timelineContact.play()) // trigger a TweenMax.to tween
                //.addIndicators({name: "Navigation Anim"}) // add indicators (requires plugin)
                .addTo(this.scrollControllerNav)
        );

    }
  }

  return module;
});
