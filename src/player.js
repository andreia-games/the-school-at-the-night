class Player {

    constructor(name) {
        this.name = name;

        this.map = null;
        this.x = -1;
        this.y = -1;
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

    changeSkin() {

    }

    Controler = class {
        constructor(player) {
            this.player = player
            this.map = this.player.map;
            this.canMove = true;

            this.createControler();
        }

        createControler() {
            let motionBootons = createDiv();
            let leftRightButtons = createDiv();

            let buttonUp = createButton('&uarr;');
            let buttonDown = createButton('&darr;');
            let buttonLeft = createButton('&larr;');
            let buttonRight = createButton('&rarr;');

            buttonUp.mousePressed(() => map.movePlayer(0, -1));
            buttonDown.mousePressed(() => map.movePlayer(0, 1));
            buttonLeft.mousePressed(() => map.movePlayer(-1, 0));
            buttonRight.mousePressed(() => map.movePlayer(1, 0));

            motionBootons.id('MotionButton');
            buttonUp.id('up');
            buttonDown.id('down');
            buttonLeft.id('left');
            buttonRight.id('right');

            leftRightButtons.child(buttonLeft);
            leftRightButtons.child(buttonRight);

            motionBootons.child(buttonUp);
            motionBootons.child(leftRightButtons);
            motionBootons.child(buttonDown);
        }

        keyPressed() {
            if (this.canMove)
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