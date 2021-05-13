class Player {

    constructor(name, boxSize, skin) {
        this.name = name;
        this.boxSize = boxSize;
        this.points = 0;

        this.map = null;
        this.x = -1;
        this.y = -1;

        if (skin == null) this.skin = this.createDefaultSkin();
        else this.skin = skin;
    }

    createDefaultSkin() {
        let skin = createGraphics(this.boxSize, this.boxSize);
        skin.background(color('red'));
        return skin;
    }

    draw() {
        image(this.skin, this.x * this.boxSize, this.y * this.boxSize, this.boxSize, this.boxSize);
    }

    changeSkin(skin) {
        if (skin != null) this.skin = skin;
    }

    addControler(event) {
        this.controler = new this.Controler(this);
    }

    setMap(map) {
        this.map = map;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    Controler = class {
        constructor(player) {
            this.player = player
            this.map = this.player.map;
            this.canMove = true;

            this.createControler();
        }

        createControler() {
            let buttonUp = select('#up');
            let buttonDown = select('#down');
            let buttonLeft = select('#left');
            let buttonRight = select('#right');

            buttonUp.mousePressed(() => map.movePlayer(0, -1));
            buttonDown.mousePressed(() => map.movePlayer(0, 1));
            buttonLeft.mousePressed(() => map.movePlayer(-1, 0));
            buttonRight.mousePressed(() => map.movePlayer(1, 0));
        }

        keyPressed() {
            if (this.canMove) {
                switch (keyCode) {
                    case 37:
                        // Arrow Left
                        map.movePlayer(-1, 0)
                        break;
                    case 38:
                        map.movePlayer(0, -1)
                        // Arrow Up
                        break;
                    case 39:
                        map.movePlayer(1, 0)
                        // Arrow Right
                        break;
                    case 40:
                        map.movePlayer(0, 1)
                        // Arrow Down
                        break;
                }
            }
        }
    }
}