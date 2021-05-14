class Character {

    constructor(name, boxSize, skin, map) {
        this.name = name;
        this.boxSize = boxSize;
        this.map = map;

        this.x = 0;
        this.y = 0;

        if (skin == null) this.skin = this.createDefaultSkin();
        else this.skin = skin;
    }

    createDefaultSkin() {
        let skin = createGraphics(this.boxSize, this.boxSize);
        skin.background(color('grey'));
        return skin;
    }

    draw() {
        image(this.skin, this.x * this.boxSize, this.y * this.boxSize, this.boxSize, this.boxSize);
    }



    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}