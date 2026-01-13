////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var $carouselPresentation = $(".carousel-presentation");
var $carouselPresentationImage = $(".carousel-presentation-image");
var $heroSliderImage = $('.carousel-hero-slider .image img');
var navigationPosition;
var navigationHasBackground;

$(document).ready(function($) {
    "use strict";

//  Preloading

    Pace.on('done', function() {
        $("body").addClass("loading-done");
        setBlocksHeight();
        $.each( $(".hero-slider .animate"), function (i) {
            var $this = $(this);
            setTimeout(function(){
                $this.addClass("idle");
            }, i * 200);
        });
    });

	$('[data-toggle="tooltip"]').tooltip();
	
    $("select").selectpicker();

//  Initialize functions

    initializeReadMore();
    initializeOwl();

    centerSlider();

    if( $(".main-navigation").hasClass("bg-dark") || $(".main-navigation").hasClass("bg-white") ){
        navigationHasBackground = 1;
    }
    else {
        navigationHasBackground = 0;
    }

//  Read More

    $('a[data-toggle="tab"], a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        initializeReadMore();
    });

    if( $('.main-navigation').length ){
        navigationPosition = Math.round( $('.main-navigation').offset().top );
    }

//  Count Down

    if($(".count-down").length ) {
        var $this = $(".count-down");
        var day = $this.attr("data-day");
        var month = $this.attr("data-month");
        var year = $this.attr("data-year");
        var date = year+'/'+month+'/'+day;
        $this.countdown(date, function(event) {
            $(".count-down .days").text( event.strftime('%D') );
            $(".count-down .hours").text( event.strftime('%H') );
            $(".count-down .minutes").text( event.strftime('%M') );
            $(".count-down .seconds").text( event.strftime('%S') );
        });
    }

//  Animation on element appear
/*
    $('.block-wrapper').appear();
    $('.block-wrapper').on('appear', function() {
        $(this).addClass("show");
        if( !$(".numbers").hasClass("counting") && !$(".numbers").hasClass("count-down") ){
            initializeCounterUp();
            $(".numbers").addClass("counting");
        }
    });
*/
//  Fit videos to container width

    if($(".video").length > 0) {
        $(".video").fitVids();
    }

//  Navigation animation

    $(".navigation-button, .navigation-items a").on("click", function() {
        if( $("body").hasClass("show-nav") ){
            $("body").removeClass("show-nav");
            $.each( $(".navigation-items li"), function (i) {
                var $this = $(this);
                setTimeout(function(){
                    $this.removeClass("idle");
                }, i * 50);
            });
        }
        else {
            $("body").addClass("show-nav");
            $.each( $(".navigation-items li"), function (i) {
                var $this = $(this);
                setTimeout(function(){
                    $this.addClass("idle");
                }, i * 50);
            });
        }
    });
    $(".overlay").on("click", function() {
        $("body").removeClass("show-nav");
    });

//  Smooth Navigation Scrolling

    $('.main-navigation .navigation-items a[href^="#"], a[href^="#"].roll').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 2000, 'swing', function () {
            window.location.hash = target;
        });
    });

//  Calendar

    if( $(".input-daterange").length > 0 ){
        $(".input-daterange").datepicker({
            todayHighlight: true
        });
    }

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Scroll
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).scroll(function () {
    var scrollAmount = $(window).scrollTop() / 4;
    scrollAmount = Math.round(scrollAmount);

    if( !$('.main-navigation').hasClass("navigation-fix-to-top") ){
        if ( $(window).scrollTop() >= navigationPosition ) {
            $('.main-navigation').addClass('fix-to-top');
        } else {
            $('.main-navigation').removeClass('fix-to-top');
        }
    }

    if ( $(window).scrollTop() >= $(window).height() ) {
        if( !navigationHasBackground ){
            $('.main-navigation').addClass('bg-dark bg-expand-left');
        }
    } else {
        if( !navigationHasBackground ){
            $('.main-navigation').removeClass('bg-dark bg-expand-left');
        }
    }

    if ($(window).width() > 768) {
        if($('.hero-slider').hasClass('has-parallax')){
            $(".carousel-hero-slider").css('top', scrollAmount + 'px');
        }
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).load(function(){
    carouselPresentationWidth();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Resize
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on('resize', function(){
    centerSlider();
    setBlocksHeight();
    carouselPresentationWidth();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function carouselPresentationWidth(){
    if( $carouselPresentation.length ){
        $carouselPresentation.width( $(window).width() - ( $carouselPresentation.offset().left +  $carouselPresentation.outerWidth()) );
        $carouselPresentationImage.owlCarousel({
            items: 1,
            autoHeight: true,
            mouseDrag: false
        });

        $carouselPresentationImage.on('translated.owl.carousel', function(event) {
            var $this = $(this);
            setTimeout(function() {
                $this.closest(".block").height( $this.children().height() );
            }, 300);
        });
    }
}

function setBlocksHeight(){

    if ($(window).width() > 767) {
        $(".block-wrapper").each(function () {
            $(this).find(".block").css( "height", $(this).height() );
        });
    }
    else {
        $(".block-wrapper").each(function () {
            //$(this).find(".block").css("height", "auto");
        });
    }

    if ($(window).width() > 979) {
        $(".heading-wrapper").each(function () {
            $(this).find(".block").css( "height", $(this).find(".container").height() );
        });
    }
    else {
        $(".heading-wrapper").each(function () {
            $(this).find(".block").css("height", "auto");
        });
    }
}

function initializeCounterUp(){
    $('.number figure').countTo({
        speed: 8000,
        refreshInterval: 50
    });
}

function initializeOwl(){

    $(".carousel-simple").owlCarousel({
        items: 1,
        nav: true,
        navText: ["",""]
    });

    $(".carousel-hero-slider").owlCarousel({
        items: 1
    });

    $(".carousel-testimonials").owlCarousel({
        items: 1,
        nav: true,
        navText: ["",""],
        autoHeight: true
    });
    $(".carousel-gallery").owlCarousel({
        items: 4,
        margin: 20,
        responsive:{
            0:{
                items:1
            },
            767:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });

    if( $(".carousel-full-width").length ){
        var $this = $(".carousel-full-width");
        var dataItems = $this.attr("data-items");
        var items;
        var imgArray = [];
        if( dataItems ){
            items = dataItems;
        }
        else {
            items = 3;
        }

        $this.owlCarousel({
            margin: 0,
            items: items,
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                767:{
                    items:2
                },
                1200:{
                    items:items
                }
            }
        });
        $(".carousel-full-width .owl-item").each(function (i) {
            imgArray.push($(this).height());
        });
        $(".carousel-full-width .owl-item .image").each(function (i) {
            var maxHeight = Math.max.apply(Math, imgArray);
            if( $(this).parent().height() < maxHeight ){
                $(this).addClass("smaller");
                $(this).find("img").height( maxHeight );
            }
        });

    }

    $(".carousel-presentation-description").owlCarousel({
        items: 1,
        nav: true,
        navText: ["",""],
        mouseDrag: false,
        responsiveBaseElement: ".block"
    });

//    $(".carousel-presentation-image img:first").one("load", function() {
//        var height = $(".carousel-presentation-description").parent().height();
//        var padding = parseInt( $(".carousel-presentation-description").parent().css("padding-top") );
//        var blockContentHeight = height  + ( padding * 2 ) ;
//        //console.log( $(".carousel-presentation-description").parent().height() );
//        //console.log( parseInt( $(".carousel-presentation-description").parent().css("padding-top") ) );
//        //console.log( blockContentHeight );
//
//        //$(this).closest(".block").height( $(this).context.height );
//    }).each(function() {
//            if(this.complete) $(this).load();
//        });

    $('.carousel-presentation-description .owl-next').click(function() {
        $(".carousel-presentation-image").trigger('next.owl.carousel');
    });
    $('.carousel-presentation-description .owl-prev').click(function() {
        $(".carousel-presentation-image").trigger('prev.owl.carousel');
    });
}

function centerSlider(){
    $(".carousel-hero-slider-wrapper").height( $(window).height() );
    $('.carousel-hero-slider .image').css('height', '');
    $('.carousel-hero-slider').css('height', '');

    var imageWidth = $heroSliderImage.width();
    var viewPortWidth = $(window).width();
    if( imageWidth > viewPortWidth ){
        var centerImage = ( imageWidth/2 ) - ( viewPortWidth/2 );
        $('.carousel-hero-slider .image img').css('left', -centerImage);
    }
    else if( $('.carousel-hero-slider .image img').height() < $('.carousel-hero-slider').height() ){
        $heroSliderImage.css('height', '100%');
        $heroSliderImage.css('width', 'auto');
        centerImage = ( $heroSliderImage.width()/2 ) - ( viewPortWidth/2 );
        $heroSliderImage.css('left', -centerImage);
    }
    else if ( imageWidth < viewPortWidth ) {
        $heroSliderImage.css('width', '100%');
        $heroSliderImage.css('height', 'auto');
    }
}

function initializeReadMore(){
    var collapseHeight;
    var $readMore = $(".read-more");
    if( $readMore.attr("data-collapse-height") ){
        collapseHeight =  parseInt( $readMore.attr("data-collapse-height") );
    }else {
        collapseHeight = 55;
    }
    //console.log( collapseHeight );
    $readMore.readmore({
        speed: 500,
        collapsedHeight: collapseHeight,
        blockCSS: 'display: inline-block; width: auto; min-width: 120px;',
        moreLink: '<a href="#" class="btn btn-default btn-framed btn-rounded">Show More<i class="icon_plus"></i></a>',
        lessLink: '<a href="#" class="btn btn-default btn-framed btn-rounded">Show Less<i class="icon_minus-06"></i></a>'
    });
}