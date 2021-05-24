class GameMap {

    /**
     * The game map rendes the game UI and controls the player motion. 
     * To do that, it use and 2d array that represent the sctruture of the map.
     * 
     * @param {String}  mapName         The name of the map.
     * @param {Number}  width           The number of collums.
     * @param {Number}  height          The number of rows.
     * @param {Number}  boxSize         The width and height of each box.
     * @param {JSON}    componetsJSON   The JSON that specify the componets of the map. 
     */
    constructor(mapName, width, height, boxSize, componetsJSON) {
        this.mapName = mapName;
        this.width = width;
        this.height = height;
        this.boxSize = boxSize;
        this.componetsJSON = loadJSON(componetsJSON, () => this.components = this.createComponets());

        this.xOffset = 0;
        this.yOffset = 0;
        this.gameGridimg = null;
        this.gameMapImg = null;

        // Inicialize the grid
        this.gridLayout = []; // Make and 2d Array
        for (let col = 0; col < this.width; col++) {
            this.gridLayout[col] = [];
            for (let row = 0; row < this.height; row++) {
                this.gridLayout[col][row] = null;
            }
        }
    }

    /**
     * Create the defaulr grid and the maps
     */
    setup() {
        this.gridLayout = this.createGrid();
        this.gameGridimg = this.createGridImg();
        this.gameMapImg = this.createGameMapImg();
    }

    /** Read all the JSON to get The diferent componets */
    createComponets() {
        let components = [];

        // Iterate by component in the JSON
        for (let key of Object.keys(this.componetsJSON)) {
            let componetJSON = this.componetsJSON[key];

            // Itere by the positions of the componets
            for (let position of componetJSON.position) {
                let componetImage = loadImage(componetJSON.spriteURL, () => {

                    // Create a new component and add the poiter to the object in the grid
                    let component = new Component(
                        position.x, position.y,
                        componetJSON.width,
                        componetJSON.height,
                        position.door,
                        componetJSON.type,
                        componetImage,
                    );

                    // Set the componet to the list
                    components.push(component);
                });
            }
        }
        return components;
    }

    /** Create grid matrix */
    createGrid() {
        let grid = this.gridLayout;

        for (let component of this.components) {
            if (component.type != "background") {
                // Set the componet to the layout
                for (let x = component.x; x < component.x + component.width; x++) {
                    for (let y = component.y; y < component.y + component.height; y++) {
                        if (grid[x][y] != null) console.warn("There is alredy a component here: " + grid[x][y]);
                        grid[x][y] = component;
                    }
                }
            }
        }

        return grid;
    }

    /** Create and grid of name and positions of the componets in the grid
     * 
     * @returns Image
     */
    createGridImg() {
        let gridImg = createGraphics(this.width * this.boxSize, this.height * this.boxSize);
        gridImg.background(color('white'));

        for (let x = 0; x <= this.width; x++) {
            for (let y = 0; y <= this.height; y++) {

                gridImg.fill(color('white'))
                gridImg.strokeWeight(1);
                gridImg.rect(x * this.boxSize, y * this.boxSize, this.boxSize, this.boxSize);

                // Draw the position of the entry
                gridImg.fill(color('gray'));
                gridImg.text(x + "," + y + "\n", x * this.boxSize, y * this.boxSize, this.boxSize, this.boxSize);
            }
        }

        return gridImg;
    }

    /** Creates the game map
     * @returns Image
     */
    createGameMapImg() {
        let gameImg = createGraphics(this.width * this.boxSize, this.height * this.boxSize);

        gameImg.background(color('#bcaaa4'));

        gameImg.textSize(30);
        gameImg.textAlign(CENTER, CENTER);
        gameImg.text("The School At the night", 10 * this.boxSize, 0 * this.boxSize, 9 * this.boxSize, 2 * this.boxSize);
        gameImg.textSize(15);
        gameImg.text("Tu tío olvidó pasar por ti. Ahora estás atrapado en la escuela. Si quisieres escapar, busca el portal verde usando las flechas o el control en pantalla antes que se acabe el tiempo. Buena suerte!",
            11 * this.boxSize, 2 * this.boxSize, 7 * this.boxSize);

        for (let component of this.components) {
            gameImg.image(component.img, component.x * this.boxSize, component.y * this.boxSize, component.width * this.boxSize, component.height * this.boxSize)
        }
        return gameImg;
    }

    /**
     * 
     * @param {Component} component 
     */
    setComponent(component) {
        this.components.push(component);
    }

    /** Add an player to the game map.
     * 
     * @param {Player} player   The player.
     * @param {Number} x        The x position.
     * @param {Number} y        The y position.
     */
    setPlayer(player, x, y) {

        if (this.player != null) {
            console.error("The map has already a player");

        } else if (x > this.width || y > this.height) {
            console.error("The position is out the map");

        } else {
            this.player = player;
            this.player.setPosition(x, y);

            this.xOffset = -player.x * this.boxSize + floor(windowWidth / 2);
            this.yOffset = -player.y * this.boxSize + floor(windowHeight / 2);
        }
    }


    /**
     * 
     * @param {Number} xChange  
     * @param {Number} yChange
     * @returns susses
     */
    moveCharacter(xChange, yChange, character) {

        if (!(character.x + xChange >= 0 && character.x + xChange <= this.width - 1 && character.y + yChange >= 0 && character.y + yChange <= this.height - 1)) {
            // The momvent is not posible cause new position is out the grid
            return false;
        }

        let component, door;

        if (this.gridLayout[character.x][character.y] != null) {
            // The character is inside a component
            component = this.gridLayout[character.x][character.y];
            door = component.door;

            let xMotion = xChange != 0 && !(character.x == door.x && character.y == door.y && door.dir == "x") && (this.gridLayout[character.x + xChange][character.y + yChange] != component)
            let yMotion = yChange != 0 && !(character.x == door.x && character.y == door.y && door.dir == "y") && (this.gridLayout[character.x + xChange][character.y + yChange] != component)

            if (door == null || xMotion || yMotion) return false;

        } else if (this.gridLayout[character.x + xChange][character.y + yChange] != null) {
            // The character is not in a component
            component = this.gridLayout[character.x + xChange][character.y + yChange];
            door = component.door;


            let xMotion = xChange != 0 && !(character.x + xChange == door.x && character.y + yChange == door.y && door.dir == "x");
            let yMotion = yChange != 0 && !(character.x + xChange == door.x && character.y + yChange == door.y && door.dir == "y");

            if (door == null || xMotion || yMotion) return false;
        }

        return true;
    }

    /** Draw the componets image */
    draw() {
        translate(this.xOffset, this.yOffset);
        background(color('black'));
        image(this.gameMapImg, 0, 0);
    }

    /** Draw the grid, the position of each entry and the componet that is there. */
    drawGrid() {
        translate(this.xOffset, this.yOffset);
        background(color('black'));
        image(this.gameGridimg, 0, 0);
    }

    /** Translate the canvas taking the player position as reference point. */
    windowResized() {
        this.xOffset = -player.x * this.boxSize + floor(windowWidth / 2);
        this.yOffset = -player.y * this.boxSize + floor(windowHeight / 2);
    }
}