// Toggle menu
$.fn.toggleAttrVal = function (attr, val1, val2) {
    var test = $(this).attr(attr);
    if (test === val1) {
        $(this).attr(attr, val2);
        return this;
    }
    if (test === val2) {
        $(this).attr(attr, val1);
        return this;
    }
    // default to val1 if neither
    $(this).attr(attr, val1);
    return this;
};

$('a[href="#"]').click(function (e) {
    e.preventDefault()
});

$(".menu-toggle").click(function () {
    $("body").toggleClass("sidebar-closed");
    $('#menuOpen').toggleClass('hidden');
    $('#menuClose').toggleClass('hidden')
});

// Toggle menu
$(".menu-item > a, .submenu-item > a").click(function (e) {
    // e.preventDefault()
    // $(this).parent().siblings().removeClass("open");
    $(this).parent().siblings().removeClass("active");
    $(this).parent().addClass("active");
});
$(".has-submenu > a").click(function () {
    $(this).parent().siblings().removeClass("open");
    $(this).parent().toggleClass("open");
});

$(document).ready(function () {
    var submenuItemsHeight = $(".submenu-items").height() + "px";
    $(".submenu-items").attr("style", `--submenuItemsHeight: ${submenuItemsHeight}`);
    // $(".submenu-items").addClass("ready");
});


// Tabs
$('#navTabs a').click(function () {
    $('#navTabs li').removeClass('active');
    $(this).parent().addClass('active');
})
$('#tabDash').click(function () {
    $('#users').toggleClass('active');
    $('#dashboard').toggleClass('active');
})
$('#tabNav').click(function () {
    $('#dashboard').toggleClass('active');
    $('#users').toggleClass('active');
})

// Toggle filter label
$('#filter-label-toggle').click(function () {
    $('.table-filters').toggleClass('hidden');
})

// Table
$('tr').click(function () {
    $(this).toggleClass('active');
    $(this).find('.checkbox').toggleClass('fa-square fa-check-square')
})

// Dropdown
$('.dropdown-toggle').click(function (e) {
    e.preventDefault()
    $(this).parent('.dropdown').toggleClass('open');
});

// Modal
$('#filter-modal').click(function () {
    $('body').toggleClass('modal-open');
    $('#modal').toggleClass('open');
})
$('.modal-close').click(function () {
    $('body').toggleClass('modal-open');
    $('#modal').toggleClass('open');
});

// Panel toggle
$('.panel-header a').click(function () {
    $(this).parent().parent().toggleClass('open');
    $(this).children('.icon').toggleClass('fa-plus fa-minus')
})


// Page sidebar toggle
$('#demo-page-search-results tr td:not(:last-child)').click(function () {
    $('#demo-page-search-results').toggleClass('page-sidebar--true');
    // $('.page-sidebar--profile').toggleClass('hidden');
})

// Login floating label
$(".input-form").each(function () {
    $(this).on("blur", function () {
        if (
            $(this)
            .val()
            .trim() != ""
        ) {
            $(this).addClass("has-val");
        } else {
            $(this).removeClass("has-val");
        }
    });
});