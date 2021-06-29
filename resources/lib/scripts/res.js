(async () => {

class FileRequest {

    static STATE = {
        READY: 0,
        REQUESTING: 1,
        FAILED: 2,
        IDLE: 3
    }

    static TYPE = {
        IMG: 0,
        JSON: 1
    }

    constructor(type, name) {
        this.name = `${name}`.trim();
        this.type = FileRequest.TYPE[`${type}`.trim().toUpperCase()];
        this.state = FileRequest.STATE.IDLE;
        this._content = null;
    }

    async fetch() {
        this.state = FileRequest.STATE.REQUESTING;
        const url = [window.location.origin, "assets", "files", this.name].join("/");
        await fetch(url)
            .then(res => {
                if (res.status >= 400) {
                    this.state = FileRequest.STATE.FAILED;
                    throw new Error("Failed request. [0]");
                }
                switch (this.type) {
                    case FileRequest.TYPE.IMG:
                        return res.blob();
                    case FileRequest.TYPE.JSON:
                        return res.json();
                    default:
                        this.state = FileRequest.STATE.FAILED;
                        throw new Error("Failed request. [1]");
                }
            }).then(val => {
                if (this.type == FileRequest.TYPE.IMG)
                    val = $("<img>").attr("src", URL.createObjectURL(val));
                this.state = FileRequest.STATE.READY;
                this._content = val;
            }).catch(console.error);
        return this;
    }

    get isReady() {
        return this.state == FileRequest.STATE.READY;
    }

    get value() {
        return this._content;
    }

}

class Carousel {

    constructor($cards) {
        this.cards = [...$cards];
        this.focus = Math.floor($cards.length/2);
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
            back: $("section.tips > img:first-of-type").clone(),
            text: $("<span>").text("counter"),
            front: $("section.tips > img:last-of-type").clone()
        }
        this.compile();
        $(window).on("resize", () => {
            this.compile();
        });
    }

    get cssWidth() {
        return Math.min(400, window.innerWidth - 20);
    }

    get cssGap() {
        return 30;
    }

    get dimensions() {
        return {
            width: `${this.cssWidth}px`,
            height: `${0.7*this.cssWidth}px`
        }
    }

    compile() {
        this._node.slider
            .css("gap", `${this.cssGap}px`)
            .empty()
            .append(...this.cards);
        this._node.controls
            .empty()
            .append(
                this.buttons.back
                    .on("click", () => {
                        this.goTo(--this.focus);
                    }),
                this.buttons.text,
                this.buttons.front
                    .on("click", () => {
                        this.goTo(++this.focus);
                    })
            );
        this.cards.forEach(($card, idx) => {
            const childNodes = $card.css(this.dimensions)
                .on("dragstart", e => {
                    e.preventDefault();
                })
                .on("click", e => {
                    e.preventDefault();
                    if (this.focus == idx)
                        $card.toggleClass("clicked");
                    else
                        this.goTo(idx);
                })
                .children("div");
            if (childNodes.length > 0)
                [...childNodes].map(node => $(node))
                    .map($node => $node.css(this.dimensions));
        });
        this.goTo();
        return this;
    }

    goTo(target = this.focus) {
        const length = this.cards.length;
        if ((target%= length) < 0) target+= length;
        this.focus = target;

        const offset = target*(this.cssWidth + this.cssGap);
        this.cards[0]?.css("margin-left", `calc(50% - ${offset}px)`);

        this.buttons.text.html(`<span>${target+1}</span><span>${this.cards.length}</span>`);

        return this;
    }

    get node() {
        return this._node.container;
    }

}

await (async () => {
    const cards = (await new FileRequest("JSON", "resources/tips.json").fetch()).value;
    if (!(cards instanceof Array)) return;

    let i = cards.length, k , temp;
    while(--i > 0){
        k = Math.floor(Math.random() * (i+1));
        temp = cards[k];
        cards[k] = cards[i];
        cards[i] = temp;
    }

    const carousel = new Carousel(
        cards.map(({front: a, back: b}) => $("<div>")
            .addClass("card")
            .append(
                $("<div>").append(
                    $("<div>").text(a),
                    $("<div>").text(b)
                )
            )
        )
    );

    const $out = $("main > section.tips > .box");
    $out.append(carousel.node);

})();

await (async() => {
    const resources = (await new FileRequest("JSON", "resources/externals.json").fetch()).value;
    if (!(resources instanceof Array)) return;

    const build = ({
            logo: l, 
            name: n, 
            description: d, 
            link: li,
            webLink: w
        }) => $("<div>")
            .addClass("res")
            .append(
                $("<a>").attr("href", w).append(
                    l,
                    $("<h2>").text(n)
                ),
                $("<p>").html(`<span>${d}</span> <a href="${li}">Source</a>`)
            );

    const nodes = [];
    for (const res of resources) {
        res.logo = res.logo ? 
            (await new FileRequest("IMG", `resources/${res.logo}`.trim()).fetch()).value :
            $("<img>").attr("src", "./assets/logo.png");
        nodes.push(build(res));
    }

    const $out = $("main > .external > .box");
    $out.append(...nodes);
})();

})();