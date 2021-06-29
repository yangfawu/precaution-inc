class ImageQuery {

    static get URLparts() {
        return [...window.location.origin.split("/")];
    }

    static ENUM = {
        WAITING: 0,
        REQUESTING: 1,
        FAILED: {
            UNKNOWN: 2,
            MISSING: 3
        },
        DONE: 4
    }

    constructor(name = "logo.png", href = "#") {
        this.name = name;
        this.href = href;
        this.url = [...ImageQuery.URLparts, "assets/thumbnails", name].join("/");
        this.$result = null;
        this._status = ImageQuery.ENUM.WAITING;
    }

    get() {
        return new Promise((resolve, reject) => {
            this._status = ImageQuery.ENUM.REQUESTING;
            fetch(this.url)
                .then(response => {
                    if (response.status >= 400) {
                        this._status = ImageQuery.ENUM.FAILED.MISSING;
                        reject("Image not found");
                    }
                    return response.blob();
                })
                .then(blob => URL.createObjectURL(blob))
                .then(imgUrl => {
                    this.$result = $("<img>").attr({
                        src: imgUrl,
                        alt: this.name
                    }).on("click", () => {
                        window.open(this.href, "_blank");
                    });
                    this._status = ImageQuery.ENUM.DONE;
                    resolve(this);
                })
                .catch(reason => {
                    this._status = ImageQuery.ENUM.FAILED.UNKNOWN;
                    reject(reason);
                });
        });
    }

    get status() {
        switch (this._status) {
            case 0:
                return "Request is idle.";
            case 1:
                return "Request has been sent."
            case 2: 
                return "Request has failed due to unknown error.";
            case 3:
                return "Request was completed but no image was found.";
            case 4:
                return "Request was completed and an image has been acquired.";
            default:
                return "Unknown status."
        }
    }

}
class Carousel {

    constructor(...fileNames) {
        this.images = [];
        this.ready = false;
        this.focus = 0;
        this._node = {
            container: $(`<section>`).addClass("carousel"),
            slider: $(`<div>`).addClass("slider"),
            controls: $(`<div>`).addClass("controls")
        };
        this._node.container.append(
            this._node.slider,
            this._node.controls
        );
        this.buttons = {
            back: $("section.gallery img:first-of-type"),
            front: $("section.gallery img:last-of-type")
        }
        Promise.allSettled(fileNames.map(obj => new ImageQuery(obj.name, obj.href).get()))
            .then(results => {
                for (const result of results.map(r => r.value)) {
                    if (result instanceof ImageQuery)
                        if (result._status == ImageQuery.ENUM.DONE)
                            this.images.push(result.$result);
                }
                this.ready = true;
                this.focus = Math.floor(this.images.length / 2);
                this.compile();
            });
        $(window).on("resize", () => {
            this.compile();
        });
    }

    get cssWidth() {
        let width = window.innerWidth / 3;
        if (width < 1000) width*= 3/2;
        else if (width < 800) {
            width*= 3;
            width-= 20;
        }
        return width;
    }

    get cssGap() {
        return 30;
    }

    compile() {
        this._node.slider
            .css("gap", `${this.cssGap}px`)
            .empty()
            .append(...this.images);
        this._node.controls
            .empty()
            .append(
                this.buttons.back.clone()
                    .on("click", () => {
                        this.goTo(--this.focus);
                    })
            );
        this.images.forEach(($img, idx) => {
            $img.css("width", `${this.cssWidth}px`)
                .on("dragstart", e => {
                    e.preventDefault();
                });
            this._node.controls.append($("<span>").on("click", () => {
                this.goTo(idx);
            }));
        });
        this._node.controls.append(
            this.buttons.front.clone()
                .on("click", () => {
                    this.goTo(++this.focus);
                })
        );
        this.goTo();
        return this;
    }

    goTo(target = this.focus) {
        const length = this.images.length;
        if ((target%= length) < 0) target+= length;
        this.focus = target;

        const offset = target*(this.cssWidth + this.cssGap);
        this.images[0].css("margin-left", `calc(50% - ${offset}px)`);

        const $anchors = [...this._node.controls.children("span")].map(span => $(span));
        $anchors.forEach($span => {
            $span.removeClass("clicked");
        });
        if (target >= 0 && target < $anchors.length)
            $anchors[target].addClass("clicked");
        return this;
    }

    get node() {
        return this._node.container;
    }

}
!async function() {
    const $target = $("section.gallery");
    const carousel = new Carousel(
        { name: "M_scam.png", href: "./microsoft-scam/" },
        { name: "NP_scam.png", href: "./nigerian-prince-scam/" },
        { name: "default_scam.png", href: "./sim1_3/" }
    );
    $target.append(carousel.node);
    console.log(carousel);
}();
// let cards = [];
// const $res = $(".gallery .resources");
// [...$res.children("img")].forEach(ele => {
//     const $ele = $(ele);
//     cards.push($('<li class="card">').append(
//         $("<li>").append($ele),
//         $("<li>").append(
//             $(`<h1>${$ele.prop("alt")}</h1>`),
//             $(`<p>${$ele.attr("data-text")}</h1>`),
//             $(`<a href="${$ele.attr("data-link")}">`).text("Try Simulation")
//         )
//     ));
// });
// $res.remove();

// let idx = 0;
// const cardsPerLoad = 3;
// const loadTime = 500;
// const $btn_ENUM = {
//     READY: "Click to Load More",
//     LOADING: "Loading"
// }
// const $btn_container = $(`<li class="btn">`);
// function check() {
//     const test = idx >= cards.length;
//     if (test) $btn_container.empty().css("visibility", "hidden");
//     return test;
// }
// const $btn = $("<button>").text($btn_ENUM.READY).click(async () => {
//     $btn.text($btn_ENUM.LOADING).prop({ disabled: true });
//     for (let i=0; i<cardsPerLoad; i++) {
//         if (check()) return;
//         await new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 $btn_container.before(cards[idx]);
//                 idx++;
//                 resolve(0);
//             }, loadTime);
//         });
//     }
//     $btn.text($btn_ENUM.READY).prop({ disabled: false });
//     check();
// });

// $(".gallery .container").empty().append($btn_container.append($btn));
// $btn.click();