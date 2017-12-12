

$(function(){
   var m = $('.mobile-menu');
   var l = $('#navbar-collapse');
   m.click(function(){
       l.toggleClass('block');
       m.toggleClass('mm-rotate');
   })
});

alert(window.innerWidth);