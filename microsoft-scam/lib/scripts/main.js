(() => {
    "use strict";

    const overlay = $(`body > section.alert`);
    const body = $(`section.alert > div div:nth-of-type(2)`);  
    const closeImg = $("body > section.alert div div:first-of-type img");
    const btn = $("body > section.alert > div div:last-of-type button:first-of-type");
    const home = $("body > section.alert > div div:last-of-type button:last-of-type");
    let counter = 0;
    const max = 3;
    function loop() {
        const close = () => {
            overlay.remove();
            loop();
        };
        setTimeout(() => {
            if (++counter == 1) overlay.css("opacity", 1);
            $(document.body).append(overlay);
            closeImg.on("click", close);
            btn.on("click", close);
            if (counter > max) {
                body.text("If you ever come across a page like this, just exit it! Nothing will happen to you when you close it!");
                home.addClass("home").on("click", () => {
                    window.location = "..";
                });
            }
        }, 500);
    };

    const makeModal = (html = "", button = "", callback = () => {}) => {
        const $modal = $("<section>").addClass("init");
        $(document.body).append($modal.append(
            $("<div>").append(
                $("<p>").html(html),
                $("<span>").text(button).on("click", e => {
                    e.preventDefault();
                    $modal.fadeOut("fast");
                    callback();
                })
            )
        ));
    }
    makeModal("Click on button to start simulation.", "Start", () => {
        setTimeout(loop, 2000);
    });

})();