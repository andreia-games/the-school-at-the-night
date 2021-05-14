class Enemy extends Character {
    constructor(name, boxSize, skin, map, player) {
        super(name, boxSize, skin, map);
        this.player = player;
        this.x = Math.random() * (map.width);
        this.y = Math.random() * (map.height);
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