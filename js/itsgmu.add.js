
//导航
$(function(){
   var m = $('.mobile-menu');
   var l = $('#navbar-collapse');
   m.click(function(){
       l.toggleClass('block');
       m.toggleClass('mm-rotate');
       return false;
   });
   $(document).click(function () {
       l.removeClass('block');
       m.removeClass('mm-rotate');
   })
});

//精彩活动
$(function () {
    var ww = window.innerWidth;
    var img_num = 4;
    if(ww<=768){
        img_num = 3;
    }
    if(ww<=414){
        img_num = 2;
    }
    var swiper = new Swiper('#swiper-stars', {
        autoplay: 4000,
        loop: true,
        effect : 'coverflow',
        slidesPerView: img_num,
        centeredSlides: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 60,
            modifier: 2,
            slideShadows : true
        },
        navigation: {
            nextEl: '.prev-button',
            prevEl: '.next-button',
            disabledClass: 'my-button-disabled',
        },
    })
});

$('input').on('focus',function () {
    $(window).trigger('resize');
});
$('input').on('change',function () {
    $(window).trigger('resize');
});
$('input').on('blur',function () {
    $(window).trigger('resize');
});

$(function(){
    var w = window.innerHeight;
    function setsize(){
        $('body').css('height',w);
    }
    setsize();
    window.onresize = setsize;
});