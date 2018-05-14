$(document).ready(function() {

    $('#fullpage').fullpage({
        anchors: ['home', 'menu', 'gallery', 'buffet', 'reservation', 'contact'],
        menu: '#menu-fullpage',
        scrollingSpeed: 1000,
        onLeave: function(index, nextIndex, direction) {
            var leavingSection = $(this);
            var tl2 = new TimelineMax();
            var titleContent = $(".title-content-home");

            //after leaving section 1
            if (index == 1 && direction == 'down') {
                console.log("Going to section 2!");

                tl2.to(titleContent, 2, { top: 100, bottom: 0, autoAlpha: 0 });

            } else if (index == 2 && direction == 'up') {
                console.log("Going to section 1!");

            }

        },
        afterLoad: function(anchorLink, index) {
            var loadedSection = $(this);
            var titleContent = $(".title-content-home");
            var tl = new TimelineMax();

            if (index == 1) {
                console.log("en section 1");

                tl.fromTo(titleContent, 2, { bottom: -100 }, { top: 0, autoAlpha: 0.7 });
            }
        }
    });

    $(".item-menu").click(function() {
        $(".hamburger").click();
    });

    $(".slider-selector").click(function(){
        var slide = $(this).attr("data-slide");
        
        console.log(slide);

        $.fn.fullpage.moveTo('menu', slide);
    });
});