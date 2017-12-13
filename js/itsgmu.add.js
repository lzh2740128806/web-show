
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

$(function () {
    var ww = window.innerWidth;
    var img_num = 4;
    var hz;
    if(ww<=768){
        img_num = 3;
    }
    if(ww<=414){
        img_num = 2;
        hz = true;
    }
    //精彩活动
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
    });
    //合作企业
    if(hz){
        var swiper2 = new Swiper('#hzqy', {
            autoplay: 4000,
        })
    }
});

$(function(){
    var w = window.innerHeight;
    function setsize(){
        $('body').css('height',w);
    }
    setsize();
    window.onresize = setsize;
});