class Player extends Character {

    constructor(name, boxSize, skin, map) {
        super(name, boxSize, skin, map);
        this.points = 0;
        this.controler = new this.Controler(this, map);
    }

    kill() {
        alert("¡Has muerto! -5 puntos")
        this.points -= 5;
        this.setPosition(14, 4);
        this.map.windowResized();
    }
    changeSkin(skin) {
        if (skin != null) this.skin = skin;
    }

    move(xChange, yChange) {
        if (this.map.moveCharacter(xChange, yChange, this)) {
            this.setPosition(this.x + xChange, this.y + yChange);
            this.map.xOffset -= xChange * this.map.boxSize;
            this.map.yOffset -= yChange * this.map.boxSize;
        }
    }
    Controler = class {
        constructor(player, map) {
            this.player = player
            this.map = map;
            this.createControler();
        }

        createControler() {
            let buttonUp = select('#up');
            let buttonDown = select('#down');
            let buttonLeft = select('#left');
            let buttonRight = select('#right');

            buttonUp.mousePressed(() => this.player.move(0, -1, this.player));
            buttonDown.mousePressed(() => this.player.move(0, 1, this.player));
            buttonLeft.mousePressed(() => this.player.move(-1, 0, this.player));
            buttonRight.mousePressed(() => this.player.move(1, 0, this.player));
        }

        keyPressed() {
            switch (keyCode) {
                case 37:
                    // Arrow Left
                    this.player.move(-1, 0, this.player)
                    break;
                case 38:
                    this.player.move(0, -1, this.player)
                    // Arrow Up
                    break;
                case 39:
                    this.player.move(1, 0, this.player)
                    // Arrow Right
                    break;
                case 40:
                    this.player.move(0, 1, this.player)
                    // Arrow Down
                    break;
            }
        }
    }
}