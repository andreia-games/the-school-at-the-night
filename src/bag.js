class Bag {

    BagElement = class {
        /**
         * 
         * @param {Image}   img
         * @param {String}  imgSrc 
         * @param {Number}  state 
         * @param {Number}  price 
         */
        constructor(img, imgSrc, state, price) {
            this.img = img;
            this.imgSrc = imgSrc;
            this.state = state;
            this.price = price;
        }
    }

    /**
     * 
     * @param {JSON} elementsJSON 
     * @param {Player} player 
     */
    constructor(elementsJSON, player) {
        this.skinMenu = select('#skin-menu');
        this.openSkinMenu = select('#open-skin-menu');
        this.closeSkinMenu = select('#close-skin-menu');

        this.openSkinMenu.mousePressed(() => this.skinMenu.show());
        this.closeSkinMenu.mousePressed(() => this.skinMenu.hide());

        this.buttons = [];
        this.player = player;
        this.elementsJSON = loadJSON(elementsJSON, () => {
            this.elements = this.createElements();
        });
    }

    setup() {
        this.skinMenu.child(this.createMenuOption());
    }

    createElements() {
        let elements = [];

        // Iterate by component in the JSON
        for (let key of Object.keys(this.elementsJSON)) {
            let elementJSON = this.elementsJSON[key];
            let elementImg = loadImage(elementJSON.img, () => {
                let element = new this.BagElement(
                    elementImg,
                    elementJSON.img,
                    elementJSON.state,
                    elementJSON.price
                );

                elements.push(element);
            });
        }

        return elements;
    }

    createMenuOption() {
        let menu = createDiv();
        menu.id("skin-options");

        for (let element of this.elements) {

            let option = createDiv();
            let img = createImg(element.imgSrc, "");
            let button = createButton(element.state);

            if (element.state != "usar") {
                button.html("<br>$" + element.price, true);
            }
            button.mousePressed(() => this.changeSkin(button, element));
            option.child(img);
            option.child(button);

            this.buttons.push(button);

            menu.child(option, true);

        }
        return menu;
    }

    changeSkin(button, element) {
        if (element.state == "usar") {
            this.player.changeSkin(element.img);
        } else {
            if (this.player.points >= element.price) {
                this.player.points -= element.price;
                button.html("usar");
                element.state = "usar";
                this.player.changeSkin(element.skin);
            } else {
                alert("No tienes suficientes puntos para comprar esta skin");
            }
        }
    }
}