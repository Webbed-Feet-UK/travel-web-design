// If browser is IE
if (BrowserDetect.browser == 'Explorer') {

    //var el = document.querySelectorAll('.js_legacy');
    var e = document.querySelectorAll('.js_svglegacy');

    for (var i=0; i<e.length; i++) {

        el = e[i];

        var img = el.getAttribute('data-legacy')

        var d = document.createElement('img');
        d.innerHTML = el.innerHTML;

        el.parentNode.insertBefore(d, el);
        el.parentNode.removeChild(el);

        d.src = img;

    }

}