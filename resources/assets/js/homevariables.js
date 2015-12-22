
/*  Breakpoints
    -----------------------------------------------
    List of screen breakpoints - used to determine if the screen size has changed significantly.
    Moving between breakpints will cause the relevant JS file to be loaded and will destroy and rebuild animation scenes.
    IMPORTANT - Array must be ordered with highest width at the top (Desc)
    Remember to also update the CSS media query breakpoints
*/

var breakpoints = [
    /*
    {
        // LG
        width: 1024,
        paths: {
            scrollmagic: "/js/scrollmagic@lg"
        }
    },
    */
    {
        // MD +
        width: 768,
        dependencies: {
            animations : 'homeanimations@md'
        }

    },
    {
        // Default (Mobile First)
        // Default breakpoint - Falls back to this if width is smaller than other sizes listed here
        width: 0,
        dependencies: {
            animations : 'homeanimations'
        }
    },

    //"480",
    //"768",
    //"992",
    //"1200",
    //"1680",
    //"1920"
];


/*  Array of navigation item id's
    -----------------------------------------------
    Used to animate individual nav menu items
*/

var navItems = [
    '#sm_targ_nav_item1',
    '#sm_targ_nav_item2',
    '#sm_targ_nav_item3'
];

// template duplicates with no maxWidth value should be first, followed by next highest value.
var templates = [
    {
        title: 'video',
        maxWidth: null,
        id: 'template_video@xl'
    },
    {
        title: 'video',
        maxWidth: 1680,
        id: 'template_video'
    }
]

/*  Debuggery
    -----------------------------------------------
    Enable console debug messages
*/

/*
var enable_debug = {
    all : true,
    typeless : true,
    verbose : true
};
*/

var enable_debug = false;