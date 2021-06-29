// const UI_OLD = new class UserInterface {

//     static TAGS = {
//         STATE: "data-state"
//     }

//     constructor() {
//         const THIS = this;
//         this._html = {
//             parent: $("section.ui"),
//             src: {
//                 min: $("section.ui > img:first-of-type"),
//                 max: $("section.ui > img:last-of-type")
//             },
//             out: {
//                 title: $("<h1>").text("UI title"),
//                 minmax: $("<img>"),
//                 story: $("<p>").text("UI instructions"),
//                 options: [...new Array(3)]
//                     .map((n, idx) => $("<li>")
//                         .attr("seq", idx + 1)
//                         .text("option definition")
//                     ),
//                 buttons: [...new Array(3)]
//                     .map((n, idx) => $("<button>")
//                         .text(idx + 1)
//                         .on("click", () => {
//                             THIS.choice = idx;
//                             THIS._cleanListeners();
//                             THIS._listeners.forEach(listener => {
//                                 listener.done = true;
//                                 listener.resolve();
//                             });
//                         })
//                     )
//             }
//         };
//         this._html.parent
//             .attr(UserInterface.TAGS.STATE, false)
//             .append(
//                 $("<div>").append(
//                     this._html.out.title,
//                     this._html.out.minmax.on("click", () => {
//                         this.toggle();
//                     })
//                 ),
//                 $("<div>").append(
//                     this._html.out.story,
//                     $("<div>").append(
//                         $("<h1>")
//                             .text("If you choose..."),
//                         $("<ol>").append(
//                             ...this._html.out.options
//                         )
//                     )
//                 ),
//                 $("<div>").append(
//                     ...this._html.out.buttons
//                 )
//             );

//         this.minimized = true;
//         this.toggle();

//         this._listeners = [];
//         this.choice = -1;
//     }

//     toggle() {
//         const newState = !this.minimized && true;
//         this.minimized = newState;
//         this._html.parent.attr(UserInterface.TAGS.STATE, newState);
//         this._html.out.minmax.attr("src",
//             this._html.src[newState ? "max" : "min"].attr("src")
//         );
//         return this;
//     }

//     _setButtonState(index, state) {
//         if (!isNaN(index)) {
//             index = parseInt(index);
//             if (index >= 0 && index < this._html.out.buttons.length)
//                 this._html.out.buttons[index]
//                     .prop("disabled", 
//                         state ? true : false
//                     );
//         }
//         return this;
//     }

//     _setAllButtonState(state) {
//         const max = this._html.out.buttons.length;
//         for (let i=0; i<max; i++)
//             this._setButtonState(i, state ? true : false);
//         return this;
//     }

//     unlockAllButtons() {
//         return this._setAllButtonState(false);
//     }

//     lockAllButtons() {
//         return this._setAllButtonState(true);
//     }

//     maximize() {
//         if (this.minimized)
//             this.toggle();
//         return this;
//     }

//     minimize() {
//         if (!this.minimized)
//             this.toggle();
//         return this;
//     }

//     setTitle(text) {
//         this._html.out.title.text(
//             `${text}`.trim()
//         );
//         return this;
//     }

//     setDirections(text) {
//         this._html.out.story.text(
//             `${text}`.trim()
//         );
//         return this;
//     }

//     setOption(index, text) {
//         if (!isNaN(index)) {
//             index = parseInt(index);
//             if (index >= 0 && index < this._html.out.options.length)
//                 this._html.out.options[index]
//                     .html(
//                         `${text}`.trim()
//                     );
//         }
//         return this;
//     }

//     setAllOptions(...texts) {
//         const max = Math.min(texts.length, this._html.out.options.length);
//         for (let i=0; i<max; i++)
//             this.setOption(i, `${texts[i]}`.trim());
//         return this;
//     }

//     _cleanListeners() {
//         const new_listeners = [];
//         for (const obj of this._listeners)
//             if (!obj.done)
//                 new_listeners.push(obj);
//         this._listeners = new_listeners;
//         return this;
//     }

//     fire(...callbacks) {
//         if (callbacks.length < 1) throw new Error("At least one callback function is needed.");

//         const target = this._html.out.options.length;
//         const finalCallbacks = callbacks.splice(0, target);
//         const copy = finalCallbacks[finalCallbacks.length - 1];
//         while (finalCallbacks.length < target)
//             finalCallbacks.push(copy);
//         console.assert(finalCallbacks.length == target);

//         console.log(finalCallbacks);

//         const obj = {
//             done: false,
//             resolve: undefined
//         };
//         const promise = new Promise(resolve => {
//             obj.resolve = resolve;
//         });
//         this._listeners.push(obj);

//         promise.then(() => {
//             this.lockAllButtons();
//             finalCallbacks[this.choice]();
//         });
//     }

// };
class Settings {

    static PARAMS = {
        scammerName: undefined,
        scammerEmail: undefined,
        responderName: "me",
        responderEmail: "me@randomemail.com"
    };

    static get isDone() {
        return Object.values(Settings.PARAMS).findIndex(e => e == undefined) < 0; 
    }

    static attr(obj) {
        if (!(obj instanceof Object)) throw new Error("Parameter needs to be an object.");
        if (Settings.isDone) throw new Error("Settings is not mutable after everything is set.");
        for (const key of Object.keys(Settings.PARAMS))
            if (obj[key] != undefined)
                Settings.PARAMS[key] = obj[key];
    }

}
class _Message {

    constructor(isResponder = false) {
        if (!Settings.isDone) throw new Error("Settings needs to be done before a Message instance can be made.");

        this._node = {
            container: $("<section>").addClass("body"),
            name: $("<span>"),
            email: $("<span>"),
            timestamp: $("<span>"),
            misc: $("<span>"),
            story: $("<div>").addClass("story")
        };

        this._isResponder = isResponder;

        this.author = {
            name: `${Settings.PARAMS[isResponder ? "responderName" : "scammerName"]}`.trim(),
            email: `${Settings.PARAMS[isResponder ? "responderEmail" : "scammerEmail"]}`.trim(),
        };
        this._node.name.text(this.author.name);
        this._node.email.text(this.author.email);

        this.timestamp = new Date().toLocaleString();
        this._node.timestamp.text(this.timestamp);

        this.isCollapsable = false;
        this.isCollapsed = false;

        this._text = "";
        this._html = "";
        this._node.story.html("");

        this._compile();
    }

    _compile() {
        this._node.container.append(
            $("<div>").append(
                $("<img>").attr({
                    src: this._isResponder ? "./assets/precaution-logo.png" : 
                        "./assets/email/content/description/profile-logo.png",
                    alt: "profile logo"
                })
            ),
            $("<div>").append(
                $("<div>").addClass("start").append(
                    $("<div>").addClass("address").append(
                        this._node.name,
                        this._node.email
                    ),
                    $("<div>").addClass("timestamp").append(
                        this._node.timestamp
                    ),
                    $("<div>").addClass("opt-box").append(
                        $("<img>").attr({
                            src: "./assets/email/content/description/star-logo.png",
                            alt: "email description option logo"
                        })
                    ),
                    $("<div>").addClass("opt-box").append(
                        $("<img>").attr({
                            src: "./assets/email/content/description/reply-logo.png",
                            alt: "email description option logo"
                        })
                    ),
                    $("<div>").addClass("opt-box").append(
                        $("<img>").attr({
                            src: "./assets/email/content/description/more-logo.png",
                            alt: "email description option logo"
                        })
                    )
                ),
                $("<div>").addClass("misc").append(
                    this._node.misc.text(`to ${Settings.PARAMS[!this._isResponder ? "responderName" : "scammerName"]}`.trim())
                ),
                this._node.story
            )
        );
        return this;
    }

    get node() {
        return this._node.container;
    }

    set innerText(val) {
        const out = `${val}`.trim();
        this._html = out;
        this._text = out;
        this._node.story.text(out);
    }

    set innerHTML(val) {
        const out = `${val}`.trim();
        this._html = out;
        this._node.story.html(out);
        this._text = `${this._node.story.text()}`.trim();
    }

    enableCollapse() {
        if (this.isCollapsable) return;
        this.isCollapsable = true;
        this._node.container.on("click", e => {
            e.preventDefault();
            this._node.container.toggleClass("collapsed");
            this.isCollapsed = !this.isCollapsed;
            this._node.story.html(this.isCollapsed ? this._node.story.text() : this._html);
        })
        return this;
    }

    toggleCollapse() {
        if (!this.isCollapsable) return this;
        this._node.container.click();
        return this;
    }

}
class Email {

    static $OUT = $("main .email .content");
    static $HEAD = $("main .email .content > section.head");
    static $TITLE = $("main .email .content > section.head > div:first-of-type span")

    constructor(title = "Email Title") {
        if (!Settings.isDone) throw new Error("Settings needs to be done before a Message instance can be made.");

        this.title = `${title}`.trim();
        this.setTitle();

        this.messages = [];
    }

    setTitle(title = this.title) {
        Email.$TITLE.text(title);
        return this;
    }

    get latestMessage() {
        if (this.messages.length < 1)
            throw new Error("At least one message needs to be added.");
        return this.messages[this.messages.length-1];
    }

    addMessage(isResponder = false) {
        const message = new _Message(isResponder);
        (this.messages.length < 1 ? Email.$HEAD : this.latestMessage.node).after(message.node);
        try {
            this.latestMessage.enableCollapse();
            this.latestMessage.toggleCollapse();
        } catch (error) {
            console.error(error);
        } finally {
            this.messages.push(message);
        }
        return message;
    }

    collapseAll() {
        for (const message of this.messages)
            message.collapse();
        return this;
    }

}
class Option {

    constructor(text = "") {
        this.text = `${text}`.trim();
        this._node = $("<p>");
        this.setText();
    }

    get node() {
        return this._node;
    }

    setText(text = this.text) {
        this.text = `${text}`.trim();
        this._node.text(text);
        return this;
    }

}
const UI = new class Ui {

    static SEND = {
        idle: "Send Reply",
        sending: "Reply Is Being Sent..."
    }

    static REPLY_DELAY = 1000;

    constructor() {

        this.selected = -1;
        this.locked = false;

        this._listeners = [];
        
        this._node = {
            container: $("<section>").addClass("ui"),
            options: [...new Array(3)].map(e => new Option("option definition")),
            optBox: $("<div>"),
            send: $("<button>"),
            sendText: $("<span>")
        };
        this._compile();
    }

    get node() {
        return this._node.container;
    }

    _submit() {
        if (this.selected < 0) return;

        this._node.sendText.text(Ui.SEND.sending);
        this.lockAllButtons();

        this._cleanListeners();
        this._listeners.forEach(listener => {
            listener.done = true;
            listener.resolve();
        });

    }

    _cleanListeners() {
        const new_listeners = [];
        for (const obj of this._listeners)
            if (!obj.done)
                new_listeners.push(obj);
        this._listeners = new_listeners;
        return this;
    }

    fire(...callbacks) {
        if (callbacks.length < 1) throw new Error("At least one callback function is needed.");

        const target = this._node.options.length;
        const finalCallbacks = callbacks.splice(0, target);
        const copy = finalCallbacks[finalCallbacks.length - 1];
        while (finalCallbacks.length < target)
            finalCallbacks.push(copy);
        console.assert(finalCallbacks.length == target);

        const obj = {
            done: false,
            resolve: undefined
        };
        const promise = new Promise(resolve => {
            obj.resolve = resolve;
        });
        this._listeners.push(obj);

        promise.then(() => {
            this._node.sendText.text(Ui.SEND.idle);

            const idx = this.selected + 0;
            EMAIL.addMessage(true).innerHTML = `
                <h1>You decided to go with option #${idx+1}: "${this._node.options[idx].text}"</h1>
            `;

            setTimeout(() => {
                this.deselect();
                finalCallbacks[idx]();
            }, Math.random()*500+Ui.REPLY_DELAY);
        });
    }

    _setButtonLocks(state = false) {
        this.locked = state;
        this._node.send.prop("disabled", state);
        this._node.optBox.attr("data-locked", state);
        return this;
    }

    lockAllButtons() {
        return this._setButtonLocks(true);
    }

    unlockAllButtons() {
        return this._setButtonLocks(false);
    }

    deselect() {
        this.selected = -1;
        this._node.optBox.attr("data-selected", -1);
        return this;
    }

    setOptionText(index, text) {
        if (index >= 0 || index < this._node.options.length)
            this._node.options[index].setText(text);
        return this;
    }

    setMultipleOptionTexts(...texts) {
        const length = Math.min(this._node.options.length, texts.length);
        for (let i=0; i<length; i++)
            this.setOptionText(i, texts[i]);
        return this;
    }

    end(message = "") {
        return this._compile(true, message);
    }

    _compile(isOver = false, message = "") {
        const msgHtml = `${message}`.trim();
        this._node.container.empty().append(
            $("<div>").append(
                $("<img>").attr({
                    src: "./assets/precaution-logo.png",
                    alt: "profile logo"
                })
            ),
            $("<div>").append(
                ...(isOver ? [
                    $("<h1>").html(`The simulation is over. <a href="..">Click Here to Go Back</a>`),
                    $("<p>").html(msgHtml || "Please refresh the website to try another path.")
                ] : [
                    $("<h1>").text("What will you do?"),
                    $("<p>").text(`Select an option and click on "Send Reply."`),
                    this._node.optBox.empty().append(
                        ...this._node.options.map((option, idx) => $("<div>")
                            .append(
                                $("<p>").text(`Option ${idx + 1}`),
                                option.node
                            ).on("click", e => {
                                e.preventDefault();
                                if (this.locked) return;
                                this._node.optBox.attr("data-selected", idx);
                                this.selected = idx;
                                this._node.send.prop("disabled", false);
                            })
                        )
                    ).attr("data-locked", this.locked),
                    $("<div>").append(
                        this._node.send
                            .append(
                                $("<img>").attr({
                                    src: "./assets/email/content/description/reply-logo.png",
                                    alt: "email description option logo"
                                }),
                                this._node.sendText.text(Ui.SEND.idle)
                            )
                            .off()
                            .on("click", () => {
                                if (this.selected < 0) {
                                    alert("Please select an option before sending a reply");
                                    return;
                                }
                                this._submit();
                            })
                            .prop("disabled", true)
                    )
                ])
            )
        );
    }

};



/* ##### ##### ##### ##### INIT ##### ##### ##### ##### */

// Set the scammer name and email. Set the user's name and email. (Optional)
Settings.attr({
    scammerName: "Tari Olubukola",
    scammerEmail: "azubma@gmail.com",
    // responderName: "me",
    // responderEmail: "me@randomemail.com"
});

// Access to EMAIL is created here.
const EMAIL = new Email("Urgent Business Proposal");


/* ##### ##### ##### ##### MAIN ##### ##### ##### ##### */
function startSimulation() {
    Email.$HEAD.after(UI.node);
    EMAIL.addMessage().innerHTML = `
        <h3>Good day,</h3>
        <p>
            I know this email will come to you as a surprise but allow me to engage in a business relationship with you.
        </p>
        <p>
        My name is Tari Olubukola, the male heir to the Olubukola fortune of $150 million dollars. The bank account held by my family member has been locked behind a paywall of $1,000 due to excessive government restrictions in Nigeria, and we need your help. Due to this restrction, my family has no remaining cash to purchase our necessities or to unlock the account. The bank requires that some fees to be paid before the money can be moved, therefore, we need your support to unlock the account. If we are successful in unlocking our bank account, we will reward you handsomely of $100,000. If you are interested in this business proposal, please reply to this email with your basic information.
        </p>
        <p>
            <span>Best,</span>
            <br>
            <span>Tari Olubukola</span>
        </p>
    `;
    UI.setMultipleOptionTexts(
        `Ignore, block, and report Tari Olubukola.`,
        `Reply to this with intended interest to work with Tari Olubukola.`,
        `Ask your family and friends to help you with the situation.`
    );
    UI.fire(
        () => {
            makeModal("This is correct! These scams are often know as 'Nigerian 419' scams because the first of them came from Nigeria. The '419' part of the name comes from the section of Nigeria’s Criminal Code which outlaws the practice. These scams now come from anywhere in the world. The scammer will contact you out of the blue by email, letter, text message or through social media, then the scammer will tell you an elaborate story about large amounts of their money trapped in banks. They will reward you for helping, but you will never be sent the money that was promised. Therefore, you should always ignore these emails and avoid engaging in these business proposals.", "Continue");
            UI.unlockAllButtons();
            UI.setMultipleOptionTexts(
                ``,
                ``,
                ``
            );
        },
        () => {
            makeModal("This is incorrect! These scams are often know as 'Nigerian 419' scams because the first of them came from Nigeria. The '419' part of the name comes from the section of Nigeria’s Criminal Code which outlaws the practice. These scams now come from anywhere in the world. The scammer will contact you out of the blue by email, letter, text message or through social media, then the scammer will tell you an elaborate story about large amounts of their money trapped in banks. They will reward you for helping, but you will never be sent the money that was promised. Therefore, you should always ignore these emails and avoid engaging in these business proposals.", "Continue");
            UI.unlockAllButtons();
            EMAIL.addMessage().innerHTML = `
                <h3>Hey,</h3>
                <p>
                    Great to hear back from you, sir. I was looking forward to your response! 
                </p>
                <p>
                    First of all, I appreciate you for agreeing upon to the business proposal. As I said before, $1,000 is required to complete the transaction. The bank will be pleased if the money arrives in 3-5 business days. Please transfer the money as soon as possible to aquire your reward. Second of all, my bank account number is 4556284125538. Once you transfer the money, further notices will given upon receiving the transaction. I look forward to execute the business proposal with you. Thank you once again. 
                </p>
                <p>
                    <span>Best,</span>
                    <br>
                    <span>Tari Olubukola</span>
                </p>
            `;
            UI.setMultipleOptionTexts(
                `Reply to Tari Olubukola & Transfer $1,000 to his bank account.`,
                `Ignore, block, and report Tari Olubukola.`,
                `Take a loan from your friend and asking for their advice.`
            );
            UI.fire(
                () => {
                makeModal("This is incorrect! Do NOT send money to any stangers. These scams are often know as 'Nigerian 419' scams because the first of them came from Nigeria. The '419' part of the name comes from the section of Nigeria’s Criminal Code which outlaws the practice. These scams now come from anywhere in the world. The scammer will contact you out of the blue by email, letter, text message or through social media, then the scammer will tell you an elaborate story about large amounts of their money trapped in banks. They will reward you for helping, but you will never be sent the money that was promised. Therefore, you should always ignore these emails and avoid engaging in these business proposals.", "Continue");
                UI.unlockAllButtons();
                EMAIL.addMessage().innerHTML = `
                <h3>Hey,</h3>
                <p>
                    I have received your transaction an hour ago. The $1,000 has been collected by myself. 
                </p>
                <p>
                    Thank you for the transaction! I have sent the $1,000 to the bank like it required, but that it has failed to unlock the family's bank account. The bank is requesting for an additional $5,000 to successfully unlock the account because of the increased government restriction in Nigeria. I will, without a doubt, increase the reward to $250,000 if you are interested to continue this business proposal. Let me know your decision as early as possible!
                </p>
                <p>
                    <span>Best,</span>
                    <br>
                    <span>Tari Olubukola</span>
                </p>
                `;
                UI.setMultipleOptionTexts(
                    `Ignore, block, and report Tari Olubukola.`,
                    `Request Tari Olubukola to return the initial $1,000 & Stop negotiation.`,
                    `Reply to Tari Olubukola & Transfer $5,000 more to his bank account.` 
                );
                UI.fire(
                    () => {
                        makeModal("This is correct! These scams are often know as 'Nigerian 419' scams because the first of them came from Nigeria. The '419' part of the name comes from the section of Nigeria’s Criminal Code which outlaws the practice. These scams now come from anywhere in the world. The scammer will contact you out of the blue by email, letter, text message or through social media, then the scammer will tell you an elaborate story about large amounts of their money trapped in banks. They will reward you for helping, but you will never be sent the money that was promised. Therefore, you should always ignore these emails and avoid engaging in these business proposals.", "Continue");
                        UI.unlockAllButtons();
                        UI.setMultipleOptionTexts(
                            ``,
                            ``,
                            ``
                        );
                    },

                    () => {
                        makeModal("This is correct, but they will not return your money! These scams are often know as 'Nigerian 419' scams because the first of them came from Nigeria. The '419' part of the name comes from the section of Nigeria’s Criminal Code which outlaws the practice. These scams now come from anywhere in the world. The scammer will contact you out of the blue by email, letter, text message or through social media, then the scammer will tell you an elaborate story about large amounts of their money trapped in banks. They will reward you for helping, but you will never be sent the money that was promised. Therefore, you should always ignore these emails and avoid engaging in these business proposals.", "Continue");
                        UI.unlockAllButtons();
                        UI.setMultipleOptionTexts(
                            ``,
                            ``,
                            ``
                        );
                    },

                    () => {
                        makeModal("This is incorrect! Do NOT send money to any stangers. These scams are often know as 'Nigerian 419' scams because the first of them came from Nigeria. The '419' part of the name comes from the section of Nigeria’s Criminal Code which outlaws the practice. These scams now come from anywhere in the world. The scammer will contact you out of the blue by email, letter, text message or through social media, then the scammer will tell you an elaborate story about large amounts of their money trapped in banks. They will reward you for helping, but you will never be sent the money that was promised. Therefore, you should always ignore these emails and avoid engaging in these business proposals.", "Continue");
                        UI.unlockAllButtons();
                        EMAIL.addMessage().innerHTML = `
                        <h3>Hey,</h3>
                        <p>
                            I have received your transaction an hour ago. The $5,000 has been collected by myself. 
                        </p>
                        <p>
                            Thank you for the transaction! I have sent the $5,000 to the bank like it required, but that it has failed to unlock the family's bank account. The bank is requesting for an additional $10,000 to successfully unlock the account because of the increased government restriction in Nigeria. I will, without a doubt, increase the reward to $500,000 if you are interested to continue this business proposal. Let me know your decision as early as possible!
                        </p>
                        <p>
                            <span>Best,</span>
                            <br>
                            <span>Tari Olubukola</span>
                        </p>
                        `;
                        UI.setMultipleOptionTexts(
                            `Ignore, block, and report Tari Olubukola.`,
                            `Ignore, block, and report Tari Olubukola.`,
                            `Ignore, block, and report Tari Olubukola.` 
                        );
                        UI.fire(
                            () => {
                                makeModal("This is correct! These scams are often know as 'Nigerian 419' scams because the first of them came from Nigeria. The '419' part of the name comes from the section of Nigeria’s Criminal Code which outlaws the practice. These scams now come from anywhere in the world. The scammer will contact you out of the blue by email, letter, text message or through social media, then the scammer will tell you an elaborate story about large amounts of their money trapped in banks. They will reward you for helping, but you will never be sent the money that was promised. Therefore, you should always ignore these emails and avoid engaging in these business proposals.", "Continue");
                                UI.unlockAllButtons();
                                UI.setMultipleOptionTexts(
                                    ``,
                                    ``,
                                    ``
                                );
                            },
                            () => {
                                makeModal("This is correct! These scams are often know as 'Nigerian 419' scams because the first of them came from Nigeria. The '419' part of the name comes from the section of Nigeria’s Criminal Code which outlaws the practice. These scams now come from anywhere in the world. The scammer will contact you out of the blue by email, letter, text message or through social media, then the scammer will tell you an elaborate story about large amounts of their money trapped in banks. They will reward you for helping, but you will never be sent the money that was promised. Therefore, you should always ignore these emails and avoid engaging in these business proposals.", "Continue");
                                UI.unlockAllButtons();
                                UI.setMultipleOptionTexts(
                                    ``,
                                    ``,
                                    ``
                                ); 
                            },
                            () => {
                                makeModal("This is correct! These scams are often know as 'Nigerian 419' scams because the first of them came from Nigeria. The '419' part of the name comes from the section of Nigeria’s Criminal Code which outlaws the practice. These scams now come from anywhere in the world. The scammer will contact you out of the blue by email, letter, text message or through social media, then the scammer will tell you an elaborate story about large amounts of their money trapped in banks. They will reward you for helping, but you will never be sent the money that was promised. Therefore, you should always ignore these emails and avoid engaging in these business proposals.", "Continue");
                                UI.unlockAllButtons();
                                UI.setMultipleOptionTexts(
                                    ``,
                                    ``,
                                    ``
                                ); 
                            },
                        )
                    },

                )
                },

                () => {
                    makeModal("This is correct! These scams are often know as 'Nigerian 419' scams because the first of them came from Nigeria. The '419' part of the name comes from the section of Nigeria’s Criminal Code which outlaws the practice. These scams now come from anywhere in the world. The scammer will contact you out of the blue by email, letter, text message or through social media, then the scammer will tell you an elaborate story about large amounts of their money trapped in banks. They will reward you for helping, but you will never be sent the money that was promised. Therefore, you should always ignore these emails and avoid engaging in these business proposals.", "Continue");
                    UI.unlockAllButtons();
                    UI.setMultipleOptionTexts(
                        ``,
                        ``,
                        ``
                    );
                },

                () => {
                    makeModal("Nothing can go wrong if you ask your family, friends, or any professionals! They will most definitely recommend you not to engage in the business affair. These scams are often know as 'Nigerian 419' scams because the first of them came from Nigeria. The '419' part of the name comes from the section of Nigeria’s Criminal Code which outlaws the practice. These scams now come from anywhere in the world. The scammer will contact you out of the blue by email, letter, text message or through social media, then the scammer will tell you an elaborate story about large amounts of their money trapped in banks. They will reward you for helping, but you will never be sent the money that was promised. Therefore, you should always ignore these emails and avoid engaging in these business proposals.", "Continue");
                    UI.unlockAllButtons();
                    UI.setMultipleOptionTexts(
                        ``,
                        ``,
                        ``
                    );
                },

            )

        },
        () => {
            makeModal("Nothing can go wrong if you ask your family, friends, or any professionals! They will most definitely recommend you not to engage in the business affair. These scams are often know as 'Nigerian 419' scams because the first of them came from Nigeria. The '419' part of the name comes from the section of Nigeria’s Criminal Code which outlaws the practice. These scams now come from anywhere in the world. The scammer will contact you out of the blue by email, letter, text message or through social media, then the scammer will tell you an elaborate story about large amounts of their money trapped in banks. They will reward you for helping, but you will never be sent the money that was promised. Therefore, you should always ignore these emails and avoid engaging in these business proposals.", "Continue"); 
            UI.unlockAllButtons();
            UI.setMultipleOptionTexts(
                ``,
                ``,
                ``
            );

        }
    )
}

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

const sendHome = () => makeModal("Click on the button to back to the home page.", "Go Home", () => {
    window.location = "..";
});

makeModal("Click Start to Begin Simulation", "Start", startSimulation);