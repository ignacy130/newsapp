if(Meteor.isClient){
    Template.MainView.rendered = function () {
    $('#carousel').slick({
        dots: false,
        arrows: false,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 2000,
        speed: 500,
        fade: false,
        cssEase: 'linear'
    });
};
}
