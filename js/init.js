var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

$(document).ready(function() {
   
    setTimeout(function() {
        $(".cover-loading-page").addClass("fadeOutUp");
    }, 4000);

    $('#fullpage').fullpage({
        anchors: ['home', 'menu', 'gallery', 'buffet', 'contact'],
        menu: '#menu-fullpage',
        scrollingSpeed: 1000,
        normalScrollElements: '.scroll-active',
        onLeave: function(index, nextIndex, direction) {
            var leavingSection = $(this);
            var tl2 = new TimelineMax();
            var titleContent = $(".title-content-home");

            //after leaving section 1
            if (index == 1 && direction == 'down') {
                tl2.to(titleContent, 2, { top: 100, bottom: 0, autoAlpha: 0 });
                init_grid_moments();
                
            } else if (index == 2 && direction == 'up') {

            }

            if (index == 2 && direction == "down") {
                init_grid_moments();
            }

            if(index == 3 && direction == "up"){
                $(".grid--type-").addClass("grid--hidden");
            }

        },
        afterLoad: function(anchorLink, index) {
            var loadedSection = $(this);
            var titleContent = $(".title-content-home");
            var tl = new TimelineMax();

            if (index == 1) {

                tl.fromTo(titleContent, 4, { bottom: -100 }, { top: 0, autoAlpha: 0.7 });

                if(isMobile.any()){
                    $("#home-video").hide();
                    $("#section0").css('background-image', 'url(img/background-mobile-home.jpg)');
                }
                
            }

            if(index == 2){
                if(isMobile.any()){
                    $(".arrow-menu").show();
                    $("#section1").addClass("scroll-active");
                }
            }

            if (index == 3) {

                // Get the modal
                var modal = document.getElementById('myModal');
                // Get the image and insert it inside the modal - use its "alt" text as a caption
                var img = $(".pick-select");
                var modalImg = document.getElementById("img01");
                var captionText = document.getElementById("caption");
                img.click(function() {
                    modal.style.display = "block";
                    modalImg.src = this.src;
                    captionText.innerHTML = this.alt;
                    $("label .menu").hide();
                });

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal.style.display = "none";
                    $("label .menu").show();
                }
            }
        }
    });

    $(window).resize(function() {
        updateScrollingClasses();
    });

    $(window).bind('mousewheel', function() {
        updateScrollingClasses();
    });

    updateScrollingClasses();

    $(".item-menu").click(function() {
        $(".hamburger").click();
    });

    $(".slider-selector").click(function() {
        var slide = $(this).attr("data-slide");
        $.fn.fullpage.moveTo('menu', slide);
    });

    $("#up-gallery").click(function(){
        $.fn.fullpage.moveSectionUp();
    });
    $("#down-gallery").click(function(){
        $.fn.fullpage.moveSectionDown();
    });
    $("#up-menu").click(function(){
        $.fn.fullpage.moveSectionUp();
    });
    $("#down-menu").click(function(){
        $.fn.fullpage.moveSectionDown();
    });
});

(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);

function updateScrollingClasses() {
    $('.section-main').each(function(index) {
        var element = $(this);
        if (element.hasScrollBar()) {
            element.addClass('scroll-active');
        } else {
            element.removeClass('scroll-active');
        }
    });
}

function initMap() {
    var uluru = { lat: 19.404108, lng: -98.996918 };
    var zoomMap = 16;
    var url_icon_map = "https://appetizers.000webhostapp.com//img/baker_64.png";

    if(isMobile.any()){
        zoomMap = 16;
        url_icon_map = "https://appetizers.000webhostapp.com//img/baker_32.png";
        $(".intro-maps").hide();
    }

    var image = {
        //Icon made by Flaticon Basic License from www.flaticon.com
        url: url_icon_map,
        // This marker is 20 pixels wide by 32 pixels high.
        //size: new google.maps.Size(32, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        //anchor: new google.maps.Point(0, 50)
      };
    

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoomMap,
        center: uluru,
        styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#66BB6A' }] },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#45e92d' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }]
            }
        ]

    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: image,
        title: 'Click para zoom',
        animation: google.maps.Animation.DROP,
    });

    map.addListener('center_changed', function() {
        // 7 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(function() {
          map.panTo(marker.getPosition());
        }, 10000);
    });

    marker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(marker.getPosition());
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
            if(isMobile.any()){
                $(".intro-maps").hide();
            }
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            if(isMobile.any()){
                $(".intro-maps").show();
            }
        }
    });
}