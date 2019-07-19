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
$('.accordion .panel-toggle').click(function () {
    $(this).parent().parent().toggleClass('open');
    $(this).children('.icon').toggleClass('fa-plus fa-minus')
})


// Page sidebar toggle
$('#demo-page-search-results tr td:not(:last-child)').click(function () {
    $('#demo-page-search-results').toggleClass('page-sidebar--true');
    // $('.page-sidebar--profile').toggleClass('hidden');
})
$('#demo-page-cr-operaters tr td:not(:last-child)').click(function () {
    $('#demo-page-cr-operaters').toggleClass('page-sidebar--true');
    // $('.page-sidebar--profile').toggleClass('hidden');
})

$(function () { //run when the DOM is ready
    $(".tab-user--signup").click(function () { //use a class, since your ID gets mangled     
        $(".panel-login").removeClass("panel-header--login"); //add the class to the clicked element
        $(".panel-login").addClass("panel-header--signin"); //add the class to the clicked element
    });
});

$(".panel-login").on(
    "webkitAnimationEnd oanimationend msAnimationEnd animationend",
    function () {
        $(this).removeClass("panel-header--signin");
    }
);
$(function () { //run when the DOM is ready
    $(".tab-user--login").click(function () { //use a class, since your ID gets mangled
        $(".panel-login").removeClass("panel-header--signin"); //add the class to the clicked element
        $(".panel-login").addClass("panel-header--login"); //add the class to the clicked element
    });
});

$(".panel-login").on(
    "webkitAnimationEnd oanimationend msAnimationEnd animationend",
    function () {
        $(this).removeClass("panel-header--login");
    }
);

$(function () { //run when the DOM is ready
    $(".tab-user--signup").click(function () { //use a class, since your ID gets mangled
        $(".tab-user--login a").removeClass("active"); //add the class to the clicked element
        $(".tab-user--signup a").addClass("active"); //add the class to the clicked element
    });
});
$(function () { //run when the DOM is ready
    $(".tab-user--login").click(function () { //use a class, since your ID gets mangled
        $(".tab-user--signup a").removeClass("active"); //add the class to the clicked element
        $(".tab-user--login a").addClass("active"); //add the class to the clicked element
    });
});
$(function () { //run when the DOM is ready
    $(".tab-user--signup").click(function () { //use a class, since your ID gets mangled
        $(".panel-body--tab-content-signup").removeClass("hidden"); //add the class to the clicked element
        $(".panel-body--tab-content-login").addClass("hidden"); //add the class to the clicked element
    });
});
$(function () { //run when the DOM is ready
    $(".tab-user--login").click(function () { //use a class, since your ID gets mangled
        $(".panel-body--tab-content-login").removeClass("hidden"); //add the class to the clicked element
        $(".panel-body--tab-content-signup").addClass("hidden"); //add the class to the clicked element
    });
});


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

$('.content').scroll(function () {
    if ($(this).scrollTop() > 0) {
        $('.header-info--sticky').addClass("sticky");
    } else {
        $('.header-info--sticky').removeClass("sticky");
    }
});