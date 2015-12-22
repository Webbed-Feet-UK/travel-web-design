define('homeanimations@md', ['ScrollMagic', 'TweenMax', 'TimelineMax', 'ScrollMagic.gsap'], function (ScrollMagic, TweenMax, TimelineMax) {
    'use strict';


// Define module methods
var module = {

    initialize: function() {
        debug('module.initialize() (home-animations@md.js)', 'module');


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

        this.timelineHero = new TimelineMax();
        this.structure.timelines.push(this.timelineHero);

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
        debug('module.initAnimations() (home-animations@md.js)', 'module');


        /*
        // Example animation - Let's describe what's happening:
        this.structure.scenes.push( // Here we are adding the adding the scene to an array so we can keep track of it and destroy it later
            new ScrollMagic.Scene({triggerElement: '#sm_trig_parallax1', triggerHook: "onEnter", duration: "200%"}) // Now we are creating the Scrollmagic Scene - a container which controls the animation (trigger time, duration etc.)
                .setTween("#sm_targ_parallax1", {x: "50%", ease: Linear.easeNone}) // Now we initialise an animation (tween) itself. This is basically a shortcut for GSAP's TweenMax class. Define animation target and properties.
                .addTo(this.scrollController) // Now we add the scene to a Scrollmagic Controller. The controller coordinates our scenes.
        );
        this.structure.targets.push("#sm_targ_parallax1"); // Lastly, we add any tween/animation targets to an array. This is so we can purge any CSS styles that the tween may have set. Prevents styles having an affect at the wrong time (on mobile mode for example).
        */

        // ----------------------- Video
        // ------------------------------------------------------------

        // Pause the video after we have scrolled past
        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: "#sm_trig_section1_wing2", triggerHook: "onLeave"})
                .on("enter", function () {
                    document.getElementById("js_video").pause();
                })
                .on("leave", function () {
                    document.getElementById("js_video").play();
                })
            	.addTo(this.scrollController)
        );




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


        // Right-hand sem-transparent overlay fade
        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: "body", triggerHook: "onLeave", offset: 0, duration: "120"})
            	.setTween("#sm_targ_BgTop", {opacity: 0, ease: Linear.easeInOut})
            	.addTo(this.scrollController)
        );
        this.structure.targets.push("#sm_targ_BgTop");

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


        // Animate Parallax video (top)
        /*
        new ScrollMagic.Scene({triggerElement: "body", triggerHook: "onLeave", duration: "60%"})
        	.setTween("._Video", {y: "40%", ease: Linear.easeInOut, force3D: true})
        	//.addIndicators()
        	.addTo(this.scrollController);
        */


        // ----------------------- Hero
        // ------------------------------------------------------------

        // Animate Parallax video (top)
        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: "body", triggerHook: "onLeave", duration: "100%"})
                /*
            	.on("progress", function (e) {
                    parallaxOffset("#sm_targ_intro", 120, e.progress);
                })
                */
                // Use setTween instead of on(progress) to tie anim directly to scroll (causes judder in Safari)
                .setTween("#sm_targ_intro", {y: "80%", ease: Linear.easeInOut})
            	.addTo(this.scrollController)
        );
        this.structure.targets.push("#sm_targ_intro");

        // Fade bg in
        this.timelineHero.from("#sm_targ_hero", 0.5, {opacity: 0, ease: Linear.easeIn});
        this.structure.targets.push("#sm_targ_hero");

        //stagger the animation of text with 0.1s between each tween's start time
        this.timelineHero.staggerFromTo(".sm_targ_intro_stagger", 0.4, {opacity: 0, scale: 3, ease: Linear.easeIn}, {opacity: 1, scale: 1, ease: Linear.easeIn}, 0.1);
        this.structure.targets.push(".sm_targ_intro_stagger");

        // Play it on first load
        this.timelineHero.play();

        // Animate the Hero to appear/disappear at a certain scroll point
        this.sceneHero = new ScrollMagic.Scene({triggerElement: "#sm_trig_hero", offset: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)/24 * 15})
            .on("enter", function () {
                module.timelineHero.reverse();
            })
            .on("leave", function () {
                debug('Hero Trigger Reverse', 'scrollmagic');
                module.timelineHero.play();
            })
        	//.addIndicators({name: "Hero Anim (Enter)"}) // add indicators (requires plugin)
        	.addTo(this.scrollController);
        this.structure.scenes.push(this.sceneHero);


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
            },

            // ----------------------- Section 2
            {   // Parallax BG
                trigger: '#sm_trig_parallax1', hook: 'onEnter', offset: 0, duration: '200%',
                target: '#sm_targ_parallax1', targetDuration: 1,
                props: {x: '50%', ease: Linear.easeNone, },
            },
            {   // Title
                trigger: '#sm_trig_section2_title', hook: 'onEnter', offset: 0, duration: '150%',
                target: '#sm_trig_section2_title', targetDuration: 1,
                props: {x: '100%', opacity: 0, ease: Power3.easeOut},
            },
            {   // Wing 1
                trigger: '#sm_trig_section2_wing1', hook: null, offset: this.offsets.md, duration: null,
                target: '#sm_targ_section2_wing1', targetDuration: 1,
                props: {x: '100%', rotation: '-=30', opacity: 0, ease: Back.easeOut},
            },
            // ----------------------- Section 3
            {   // Parallax BG
                trigger: '#sm_trig_parallax2', hook: 'onEnter', offset: 0, duration: '200%',
                target: '#sm_targ_parallax2', targetDuration: 1,
                props: {y: '-50%', ease: Linear.easeNone, },
            },
            {   // Title
                trigger: '#sm_trig_section3_title', hook: 'onEnter', offset: 0, duration: '150%',
                target: '#sm_trig_section3_title', targetDuration: 1,
                props: {x: '-100%', opacity: 0, ease: Power3.easeOut},
            },
            {   // Text 1
                trigger: '#sm_trig_section3_text1', hook: null, offset: this.offsets.sm, duration: null,
                target: '#sm_targ_section3_text1', targetDuration: 1,
                props: {opacity: 0, y: 100, ease: Power3.easeOut},
            },
            {   // World
                trigger: '#sm_trig_section3_text1', hook: 'onEnter', offset: 0, duration: '120%',
                target: '#sm_targ_section3_img1', targetDuration: 1,
                props: {backgroundPosition: '-300% center', ease: Linear.easeOut},
            },
            {   // Wing 1
                trigger: '#sm_trig_section3_wing1', hook: null, offset: this.offsets.md, duration: null,
                target: '#sm_targ_section3_wing1', targetDuration: 1,
                props: {x: '-100%', rotation: '+=30', opacity: 0, ease: Back.easeOut},
            },
            {   // Text 2
                trigger: '#sm_trig_section3_text2', hook: null, offset: this.offsets.sm, duration: null,
                target: '#sm_targ_section3_text2', targetDuration: 1,
                props: {opacity: 0, y: 100, ease: Power3.easeOut},
            },
            {   // Wing 2
                trigger: '#sm_trig_section3_wing2', hook: null, offset: this.offsets.md, duration: null,
                target: '#sm_targ_section3_wing2', targetDuration: 1,
                props: {x: '100%', rotation: '+=30', opacity: 0, ease: Back.easeOut},
            },
            {   // Text 3
                trigger: '#sm_trig_section3_text3', hook: null, offset: this.offsets.sm, duration: null,
                target: '#sm_targ_section3_text3', targetDuration: 1,
                props: {opacity: 0, y: -100, ease: Power3.easeOut},
            },
            // ----------------------- Section 4
            {   // Parallax BG
                trigger: '#sm_trig_parallax3', hook: 'onEnter', offset: 0, duration: '200%',
                target: '#sm_targ_parallax3', targetDuration: 1,
                props: {x: '-50%', ease: Linear.easeNone, },
            },
            {   // Title
                trigger: '#sm_trig_section4_title', hook: 'onEnter', offset: 0, duration: '150%',
                target: '#sm_trig_section4_title', targetDuration: 1,
                props: {x: '100%', opacity: 0, ease: Power3.easeOut},
            },
            {   // Text 1
                trigger: '#sm_trig_section4_text1', hook: null, offset: this.offsets.sm, duration: null,
                target: '#sm_targ_section4_text1', targetDuration: 1,
                props: {opacity: 0, y: 100, ease: Power3.easeOut},
            },
            {   // Bloke
                trigger: '#sm_trig_section4_text1', hook: null, offset: this.offsets.sm, duration: null,
                target: '#sm_targ_section4_img1', targetDuration: 1,
                props: {scale: 0.2, x: -300, opacity: 0, ease: Power3.easeOut},
            },
            {   // Wing 1
                trigger: '#sm_trig_section4_wing1', hook: null, offset: this.offsets.md, duration: null,
                target: '#sm_targ_section4_wing1', targetDuration: 1,
                props: {x: '100%', rotation: '-=30', opacity: 0, ease: Back.easeOut},
            },
            {   // Wing 2
                trigger: '#sm_trig_section4_wing2', hook: null, offset: this.offsets.md, duration: null,
                target: '#sm_targ_section4_wing2', targetDuration: 1,
                props: {x: '-100%', rotation: '+=30', opacity: 0, ease: Back.easeOut},
            },
            {   // Before/After
                trigger: '#sm_trig_section4_wing2', hook: null, offset: this.offsets.md, duration: null,
                target: '#sm_targ_section4_img5', targetDuration: 1,
                props: {opacity: 0, x: '20%', ease: Power3.easeOut},
            },
            {   // Text 2
                trigger: '#sm_trig_section4_text2', hook: null, offset: this.offsets.sm, duration: null,
                target: '#sm_targ_section4_text2', targetDuration: 1,
                props: {opacity: 0, ease: Power3.easeOut},
            },
            {   // Text 3
                trigger: '#sm_trig_section4_text3', hook: null, offset: this.offsets.sm, duration: null,
                target: '#sm_targ_section4_text3', targetDuration: 1,
                props: {opacity: 0, y: -100, ease: Power3.easeOut},
            },




/*
            {   // Image 4
                trigger: '#sm_trig_section4_img4', hook: null, offset: 0, duration: null,
                target: '#sm_targ_section4_img4', targetDuration: 1,
                props: {opacity: 0, ease: Power3.easeOut},
            },

            {   // Image 5
                trigger: '#sm_trig_section4_img5', hook: null, offset: Math.abs(this.offsets.sm), duration: null,
                target: '#sm_targ_section4_img5_before', targetDuration: 1,
                props: {opacity: 1, rotationY: 0, perspective:500, ease: Power3.easeOut},
            },
            {
                trigger: '#sm_trig_section4_img5', hook: null, offset: Math.abs(this.offsets.sm), duration: null,
                target: '#sm_targ_section4_img5_after', targetDuration: 1,
                props: {opacity: 0, rotationY: 180, perspective:500, ease: Power3.easeOut},
            },
*/

            // ----------------------- Section 5
            {   // Parallax BG
                trigger: '#sm_trig_parallax4', hook: 'onEnter', offset: 0, duration: '200%',
                target: '#sm_targ_parallax4', targetDuration: 1,
                props: {y: '-50%', ease: Linear.easeNone},
            },
            {   // Title
                trigger: '#sm_trig_section5_title', hook: 'onEnter', offset: 0, duration: '150%',
                target: '#sm_trig_section5_title', targetDuration: 1,
                props: {x: '-100%', opacity: 0, ease: Power3.easeOut},
            },

            {   // Contact button 1
                trigger: '#sm_trig_section5_contact1', hook: 'onEnter', offset: 0, duration: null,
                target: '#sm_targ_section5_contact1', targetDuration: 1,
                props: {rotation: '-=5', ease: Elastic.easeInOut.config(1,0.3)},
            },
            {   // Contact button 2
                trigger: '#sm_trig_section5_contact2', hook: 'onEnter', offset: 0, duration: null,
                target: '#sm_targ_section5_contact2', targetDuration: 1,
                props: {rotation: '-=5', ease: Elastic.easeInOut.config(1,0.3)},
            },
/*
            {   // Contact button 3
                trigger: '#sm_trig_section5_contact3', hook: 'onEnter', offset: 0, duration: null,
                target: '#sm_targ_section5_contact3', targetDuration: 1,
                props: {rotation: '+=20', ease: Elastic.easeInOut.config(1,0.3)},
            },
*/

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



        // ----------------------- Section 2

        this.timelines.section2 = {};

        // Text 1
        this.timelines.section2.bulletPoints = new TimelineMax({
            tweens: [
                TweenMax.from("#sm_targ_section2_text1", 0.4, {opacity: 0, scale: 3, y: 100, ease: Linear.easeIn, clearProps:"transform"}),
                TweenMax.from("#sm_targ_section2_text1_bullet1", 0.6, {opacity: 0, x: 600, ease: Linear.easeIn, clearProps:"transform"}),
                TweenMax.from("#sm_targ_section2_text1_bullet1_icon", 0.4, {opacity: 0, x: -200, ease: Linear.easeIn, clearProps:"transform"}),
                TweenMax.from("#sm_targ_section2_text1_bullet2", 0.6, {opacity: 0, x: 600, ease: Linear.easeIn, clearProps:"transform"}),
                TweenMax.from("#sm_targ_section2_text1_bullet2_icon", 0.4, {opacity: 0, x: -200, ease: Linear.easeIn, clearProps:"transform"}),
                TweenMax.from("#sm_targ_section2_text1_bullet3", 0.6, {opacity: 0, x: 600, ease: Linear.easeIn, clearProps:"transform"}),
                TweenMax.from("#sm_targ_section2_text1_bullet3_icon", 0.4, {opacity: 0, x: -200, ease: Linear.easeIn, clearProps:"transform"}),
            ],
            stagger: 0.1
        });
        this.structure.targets = this.structure.targets.concat([
            "#sm_targ_section2_text1",
            "#sm_targ_section2_text1_bullet1",
            "#sm_targ_section2_text1_bullet1_icon",
            "#sm_targ_section2_text1_bullet2",
            "#sm_targ_section2_text1_bullet2_icon",
            "#sm_targ_section2_text1_bullet3",
            "#sm_targ_section2_text1_bullet3_icon"
        ]);

        // Timeline needs to be reversed by default so it's ready to play when we scroll down to it
        module.timelines.section2.bulletPoints.reverse();

        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: "#sm_trig_section2_text1", offset: this.offsets.sm})
                .on("enter", function () {
                    module.timelines.section2.bulletPoints.play();
                })
                .on("leave", function () {
                    module.timelines.section2.bulletPoints.reverse();
                })
            	.addTo(this.scrollController)
        );
        this.structure.timelines.push(this.timelines.section2.bulletPoints);

        // Text 2
        this.timelines.section2.bulletIcons = new TimelineMax().staggerFrom(".sm_targ_section2_text2", 0.4, {opacity: 0, scale: 3, y: -300, ease: Linear.easeIn, clearProps:"transform"}, 0.15);
        this.structure.targets.push(".sm_targ_section2_text2");
        module.timelines.section2.bulletIcons.reverse();

        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: "#sm_trig_section2_text2", offset: this.offsets.sm})
                .on("enter", function () {
                    module.timelines.section2.bulletIcons.play();
                })
                .on("leave", function () {
                    module.timelines.section2.bulletIcons.reverse();
                })
            	.addTo(this.scrollController)
        );
        this.structure.timelines.push(this.timelines.section2.bulletIcons);



        // ----------------------- Section 3

        this.timelines.section3 = {};

        // Brush
        this.timelines.section3.brush = new TimelineMax({
            tweens: [
                TweenMax.to('#sm_targ_section3_img2', 1, {rotationZ: '-=45', ease: Power3.easeOut, overwrite:"none"}),
                TweenMax.to('#sm_targ_section3_img2', 0, {rotationY:'180', delay: 1,}),
                TweenMax.to('#sm_targ_section3_img2', 1, {rotationZ: '+=45', delay: 0.9, ease: Power3.easeOut, overwrite:"none"}),
                TweenMax.to('#sm_targ_section3_img2', 0, {rotationY:'0', delay: 2,}),
            ],
            stagger: 0.1,
            repeat: -1
        });
        this.structure.targets.push("#sm_targ_section3_img2");

        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: "#sm_targ_section3_img2"})
                .setTween(this.timelines.section3.brush)
                .triggerHook("onCenter")
                //.offset(-100)
                .reverse(true)
                //.duration('100%')
                .addTo(this.scrollController)
        );

        // Paper Plane
        var flightpath = {
			curviness: 1.25,
			autoRotate: true,
			values: [
                {x: 200, y: -500},
                {x: 0, y: -500},
                {x: -Math.abs((document.documentElement.clientWidth/4)*2), y: -500},
                //{x: -Math.abs(document.documentElement.clientWidth/3), y: -450},
                //{x: -Math.abs((document.documentElement.clientWidth/4)*2.5), y: -275},
                {x: -Math.abs((document.documentElement.clientWidth/2)), y: -250},
                {x: 0, y: 0},
            ]
		};

		this.timelines.section3.plane = new TimelineMax()
			.add(TweenMax.to("#sm_targ_section3_img3", 1.2, {css:{bezier:flightpath, opacity: 1}, ease:Power1.easeInOut}));
        this.structure.targets.push("#sm_targ_section3_img3");
		this.structure.scenes.push(new ScrollMagic.Scene({
        		triggerElement: "#sm_trig_section3_text3",
        		triggerHook: "onEnter",
        		duration: '100%',
        		offset: -Math.abs(document.documentElement.clientHeight/3)
    		})
			.setTween(this.timelines.section3.plane)
			.addTo(this.scrollController)
        );


        // ----------------------- Section 4

        // Graph Anim
        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: '#sm_trig_graph1', triggerHook: "onEnter", duration: "40%", offset: 400})
                .setTween(".sm_targ_graph1", {strokeDashoffset: 0, ease: Linear.easeNone})
                .addTo(this.scrollController)
        );
        this.structure.targets.push("#sm_targ_graph1");

        // ----------------------- Section 5

        this.timelines.section5 = {};

        // Form Fields
        /*
        this.timelines.section5.form = new TimelineMax().staggerFrom(".sm_targ_section5_field", 0.4, {opacity: 0, scale: 3, y: 50, ease: Linear.easeIn, clearProps:"transform"}, 0.15);
        this.structure.targets.push(".sm_targ_section5_field");
        module.timelines.section5.form.reverse();

        this.structure.scenes.push(
            new ScrollMagic.Scene({triggerElement: "#sm_trig_section5_form", offset: this.offsets.sm})
                .on("enter", function () {
                    module.timelines.section5.form.play();
                })
                .on("leave", function () {
                    module.timelines.section5.form.reverse();
                })
            	.addTo(this.scrollController)
        );
        this.structure.timelines.push(this.timelines.section5.form);
        */



    },


    initCustomTimelines: function() {

        // ----------------------- Section 4

        this.timelines.section4 = {};

        // Before After
        this.timelines.section4.comparison = new TimelineMax({repeat: -1,})
            .to('#sm_targ_section4_img5_before', 0, {opacity: 1, rotationY: 0, perspective:500}, '0')
            .to('#sm_targ_section4_img5_before', 1, {opacity: 0, rotationY: 180, perspective:500, ease: Power3.easeOut}, '2.5')
            .to('#sm_targ_section4_img5_before', 1, {opacity: 1, rotationY: 0, perspective:500, ease: Power3.easeOut}, '6')

            .to('#sm_targ_section4_img5_after', 0, {opacity: 0, rotationY: 180, perspective:500}, '0')
            .to('#sm_targ_section4_img5_after', 1, {opacity: 1, rotationY: 0, perspective:500, ease: Power3.easeOut}, '2.5')
            .to('#sm_targ_section4_img5_after', 1, {opacity: 0, rotationY: 180, perspective:500, ease: Power3.easeOut}, '6');

        this.structure.targets = this.structure.targets.concat([
            "#sm_targ_section4_img5_before",
            "#sm_targ_section4_img5_after",
        ]);

        //this.timelines.section4.comparison.play();

    },


    removeCustomTimelines: function() {

        this.timelines.section4.comparison.kill();
        this.timelines.section4.comparison = null; // set to null for garbage collection;


    },


    resize: function(width, dimension){
        debug('module.resize() (home-animations@md.js)', 'module');

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
        debug('module.enable() (home-animations@md.js)', 'module');

        for(var i=0; i < this.structure.controllers.length; i++) {
            this.structure.controllers[i].enabled(true);
            //this.structure.controllers[i].destroy(true);
            //this.structure.controllers[i] = null; // set to null for garbage collection;
        }


        for(var i=0; i < this.structure.scenes.length; i++) {
            this.structure.scenes[i].enabled(true);
            //this.structure.scenes[i].destroy(false);
            //this.structure.scenes[i] = null; // set to null for garbage collection
        }

        this.addPreviousStyles();
        this.initCustomTimelines();

    },


    disable: function(){
        debug('module.disable() (home-animations@md.js)', 'module');

        // Disable scrollmagic scenes
        for(var i=0; i < this.structure.scenes.length; i++) {
            this.structure.scenes[i].enabled(false);
        }

        // Disable scrollmagic controllers
        /*
        for(var i=0; i < this.structure.controllers.length; i++) {
            this.structure.controllers[i].enabled(false);
        }
        */

        setTimeout(function() {
            module.removeStyles()
        }, 200);


        this.removeCustomTimelines();

    },


    removeStyles: function() {
        debug('module.removeStyles() (home-animations@md.js)', 'module');

        // Loop through all SM targets...
        //console.log('removeStyles::Targets', this.structure.targets);
        for(var i=0; i < this.structure.targets.length; i++) {
            var el = document.querySelectorAll(this.structure.targets[i]);
            //console.log('removeStyles::Targets::Elements', el);
            for (var q=0; q < el.length; q++) {
                // ...and remove style properties
                el[q].oldStyles = el[q].getAttribute("style");
                el[q].removeAttribute("style");
                //console.log('removeStyles::Targets::Elements::Removed', el[q]);
                //console.log('removeStyles::Targets::Elements::Removed::Styles', el[q].getAttribute("style"));
            }
        }
    },

    addPreviousStyles: function() {
        debug('module.addPreviousStyles() (home-animations@md.js)', 'module');

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
        debug('module.destroy() (home-animations@md.js)', 'module');

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
        debug('module.calcNavAnimation() (home-animations@md.js)', 'module');

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

