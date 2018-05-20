$(document).ready(function() {

    setTimeout(function() {
        $(".cover-loading-page").addClass("fadeOutUp");
    }, 3000); 

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
                console.log("Going to section 2!");

                tl2.to(titleContent, 2, { top: 100, bottom: 0, autoAlpha: 0 });
                init_grid_moments();
                
            } else if (index == 2 && direction == 'up') {
                console.log("Going to section 1!");

            }

            if (index == 2 && direction == "down") {
                console.log("going to section 3");

                init_grid_moments();
            }

        },
        afterLoad: function(anchorLink, index) {
            var loadedSection = $(this);
            var titleContent = $(".title-content-home");
            var tl = new TimelineMax();

            if (index == 1) {
                console.log("en section 1");

                tl.fromTo(titleContent, 4, { bottom: -100 }, { top: 0, autoAlpha: 0.7 });
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

        console.log(slide);

        $.fn.fullpage.moveTo('menu', slide);
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
    var image = {
        //Icon made by Flaticon Basic License from www.flaticon.com
        url: 'https://image.flaticon.com/icons/svg/817/817382.svg',
        // This marker is 20 pixels wide by 32 pixels high.
        //size: new google.maps.Size(32, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        //anchor: new google.maps.Point(0, 50)
      };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 20,
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
        animation: google.maps.Animation.DROP,
    });
    marker.addListener('click', toggleBounce);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }