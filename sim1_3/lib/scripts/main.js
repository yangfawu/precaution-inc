// (function () {
//     $(window).scroll(function() {
//         var a = $(this).scrollTop() + $(this).innerHeight();
//         $(".effect, .effect1, .effect2, .effect3, .effect4, .effect5").each(function() { // container must have class name effect to work
//             var b = $(this).offset().top;
//             if (a > b && $(this).css("opacity") == 0) {
//                 $(this).css("transform", "none");
//                 $(this).animate({
//                     "opacity": 1
//                 }, 750);
//             }
//         });
//     }).scroll();
// })();