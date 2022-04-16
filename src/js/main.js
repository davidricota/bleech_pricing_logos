var quotes = new Swiper(".pricing-quotes-slider", {
    spaceBetween: 50,
    centeredSlides: true,
    loop: true,
    /* autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    }, */
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

});
var logos = new Swiper(".logos-slider", {
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {

        991: {
            spaceBetween: 80,
        }
    }
});