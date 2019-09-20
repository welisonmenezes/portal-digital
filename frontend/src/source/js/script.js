$(".slideshow").slick({
    lazyLoad: 'ondemand',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    fade: false,
    pauseOnHover: false,
    pauseOnFocus: false
});

$(".carousel").slick({
    lazyLoad: 'ondemand',
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});