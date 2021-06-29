/* #### #### #### #### HEADER #### #### #### #### */
const $header = $("body > header");
const $window = $(window);
const $mobile_btn = $("body > header > div:last-of-type img");
const $mobile = $("body > header > section.mobile");
$window.on("scroll", e => {
    const offset = $window.scrollTop();
    $header.attr("style", `
        --header-background: ${offset == 0 ? "#1A1A1D": "white"};
        --header-color: ${offset == 0 ? "white": "black"};
    `);
    $mobile_btn.css("filter", `invert(${offset == 0 ? "100" : "0"}%)`)
});
$mobile_btn.on("click", e => {
    $mobile.toggleClass("clicked");
});

/* #### #### #### #### EFFECTS #### #### #### #### */
(function () {
    $(window).scroll(function() {
        var a = $(this).scrollTop() + $(this).innerHeight();
        $(".effect, .effect1, .effect2, .effect3, .effect4, .effect5").each(function() { // container must have class name effect to work
            var b = $(this).offset().top;
            if (a > b && $(this).css("opacity") == 0) {
                $(this).css("transform", "none");
                $(this).animate({
                    "opacity": 1
                }, 750);
            }
        });
    }).scroll();
})();

/* #### #### #### #### MODAL #### #### #### #### */
function modalAppear(){
    $(".modalback").css({
        "display" : "flex"
    })
    document.querySelector("body").style.overflow = "hidden";
}

function modalGone(){
    $(".modalback").css({
        "display" : "none"
    })
    document.querySelector("body").style.overflow = "auto";
}


/* #### #### #### #### MOBILE #### #### #### #### */
ifPhone = () =>{
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        $("footer li").css({
            "font-size" : "15px"
        })
        $(".objective div:first-of-type").css({
            "font-size" : "2.5rem",
            "text-align" : "left"
        })
        $(".objective div:last-of-type").css({
            "font-size" : "1.25rem",
            "text-align" : "center"
        })
    }else{
        
    }
}
ifPhone();