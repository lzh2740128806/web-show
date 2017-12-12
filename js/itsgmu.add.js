

$(function(){
   var m = $('.mobile-menu');
   var l = $('#navbar-collapse');
   m.click(function(){
       l.toggleClass('block');
       m.toggleClass('mm-rotate');
   })
});

$('#thinkWord').on('blur', function(){
    $(window).trigger("resize");
});