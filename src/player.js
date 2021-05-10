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