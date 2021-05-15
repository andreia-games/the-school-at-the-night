class Enemy extends Character {
    constructor(name, boxSize, skin, map, player) {
        super(name, boxSize, skin, map);
        this.player = player;
        this.x = Math.round(Math.random() * (map.width));
        this.y = Math.round(Math.random() * (map.height));
    }

    move() {
        let dir = Math.round(Math.random()) ? "y" : "x"
        let xChange = 0, yChange = 0;

        if (dir == "x") xChange = (Math.random() < 0.5) ? -1 : 1;
        else yChange = (Math.random() < 0.5) ? -1 : 1;

        if (this.x + xChange >= 0 && this.x + xChange <= this.map.width - 1 && this.y + yChange >= 0 && this.y + yChange <= this.map.height - 1)
            this.setPosition(this.x + xChange, this.y + yChange);

        if (this.x == this.player.x && this.y == this.player.y) this.player.kill();
    }
}

class WinPoint extends Character {
    constructor(name, boxSize, skin, map, player) {
        super(name, boxSize, skin, map);
        this.player = player;
        this.x = Math.round(Math.random() * (map.width));
        this.y = Math.round(Math.random() * (map.height));
    }

    move() {
        let x = Math.round(Math.random() * (map.width));
        let y = Math.round(Math.random() * (map.height));

        if (this.map.gridLayout[x][y] != null && this.map.gridLayout[x][y].door != null) {
            this.x = x;
            this.y = y;
        }
    }
}