/**
 * Category Menu Active State Loader
 * Highlights active category in sidebar and top navbar based on current URL/path
 */
window.addEventListener("DOMContentLoaded", function () {
    load_menu_css();
});

function load_menu_css() {
    if (typeof jQuery === "undefined") return;
    jQuery("ul.mCustomScrollbar li.category-item").removeClass('active');
    jQuery("li.nav-item").removeClass('active');
    jQuery(".cat-pill").removeClass('active');

    var href = window.location.href;
    var path_name = window.location.pathname;
    var filename = path_name.substring(path_name.lastIndexOf('/') + 1);

    // Sidebar category items
    jQuery("ul.mCustomScrollbar li.category-item a").each(function () {
        var current_url = jQuery(this).attr('href');
        var item_file = current_url ? current_url.substring(current_url.lastIndexOf('/') + 1) : '';
        if (filename && item_file && filename === item_file) {
            jQuery(this).parent().addClass("active");
        } else if (href === current_url || href === current_url + "/" || path_name === current_url) {
            jQuery(this).parent().addClass("active");
        }
    });

    // Top navbar pills
    jQuery(".cat-pill").each(function () {
        var pill_href = jQuery(this).attr('href');
        var pill_file = pill_href ? pill_href.substring(pill_href.lastIndexOf('/') + 1) : '';
        if (filename && pill_file && filename === pill_file) {
            jQuery(this).addClass("active");
        } else if (href === pill_href || path_name === pill_href) {
            jQuery(this).addClass("active");
        }
    });

    jQuery("li.nav-item a").each(function () {
        var current_url = jQuery(this).attr('href');
        if (href === current_url || href === current_url + "/" || path_name === current_url) {
            jQuery(this).parent().addClass("active");
        }
    });
}
