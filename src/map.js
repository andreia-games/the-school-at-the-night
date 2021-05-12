class GameMap {

    Component = class {
        /**
         * 
         * @param {String}  name    Name of the componet.
         * @param {Number}  x       x position of the componet.
         * @param {Number}  y       y position of the componet.
         * @param {Number}  width   Number of collum of the componets.
         * @param {Number}  height  Number of rows of the componets.
         * @param {JSON}    door    Position and direction of the door.
         * @param {String}  type    Block or background
         * @param {Image}   img     Image of the component image.
         */
        constructor(name, x, y, width, height, boxSize, door, type, img) {
            this.name = name;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.door = door;
            this.type = type;
            this.boxSize = boxSize;
            this.img = img;
        }
    }

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

        // By deafult if 0 (not traslated) when the player is added or moved it change
        this.xOffset = 0;
        this.yOffset = 0;
    }

    setup() {
        // this.components = this.createComponets();
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
                    let component = new this.Component(
                        componetJSON.name,
                        position.x, position.y,
                        componetJSON.width,
                        componetJSON.height,
                        this.boxSize,
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
        // Inicialize the grid
        let grid = []; // Make and 2d Array
        for (let col = 0; col < width; col++) {
            grid[col] = [];  // Add an empty row to the collum
            for (let row = 0; row < height; row++) {
                grid[col][row] = null;
            }
        }

        for (let component of this.components) {
            if (component.type != "background") {
                // Set the componet to the layout
                for (let x = component.x; x < component.x + component.width; x++) {
                    for (let y = component.y; y < component.y + component.height; y++) {
                        if (grid[x][y] != null) {
                            console.warn("There is alredy a component here." +
                                "\ncreate: " + key + " on x: " + x + " y: " + y +
                                "\ncreate: ", component.name +
                            "\nOverwrite: ", grid[x][y]);
                        }
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
                if (this.gridLayout[x][y] != null)
                    gridImg.text(x + "," + y + "\n" + this.gridLayout[x][y].name, x * this.boxSize, y * this.boxSize, this.boxSize, this.boxSize);
                else
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
        gameImg.text("The School At the night", 10 * this.boxSize, 0 * this.boxSize, 10 * this.boxSize, 2 * this.boxSize);
        gameImg.textSize(15);
        gameImg.text("Tu descuidado tio no fue a buscarte a la escuela. Ahora estas atrapada en ella a mitad de la noche. Si quieres salir de aquí antes de que el reloj marque la una y los esqueletos salgan de sus tumbas, deberas completar una serie de misiones. Buena suerte.",
            11 * this.boxSize, 2 * this.boxSize, 7 * this.boxSize);

        for (let component of this.components) {
            gameImg.image(component.img, component.x * this.boxSize, component.y * this.boxSize, component.width * this.boxSize, component.height * this.boxSize)
        }
        return gameImg;
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
            this.player.setMap(this);
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
    movePlayer(xChange, yChange) {

        if (!(player.x + xChange >= 0 && player.x + xChange <= this.width - 1 && player.y + yChange >= 0 && player.y + yChange <= this.height - 1)) {
            // The momvent is not posible cause new position is out the grid
            return false;
        }

        if (this.gridLayout[this.player.x][this.player.y] != null) {
            // The player is inside a component

            let component = this.gridLayout[this.player.x][this.player.y];
            let door = component.door;

            if (door == null) return false; // The is not a door, the player can't move

            if (xChange != 0) {
                if (!(this.player.x == door.x && this.player.y == door.y && door.dir == "x") && (this.gridLayout[this.player.x + xChange][this.player.y + yChange] != component)) {
                    // True means: There is not a door and the player wants move out the component. Then, the player can't move
                    return false;
                }
            } else {
                if (!(this.player.x == door.x && this.player.y == door.y && door.dir == "y") && (this.gridLayout[this.player.x + xChange][this.player.y + yChange] != component)) {
                    // True means: There is not a door and the player wants move out the component. Then, the player can't move
                    return false;
                }
            }
        } else {
            // The player is not in a component

            if (this.gridLayout[player.x + xChange][player.y + yChange] != null) {
                // True means: There is an component in the new position
                let component = this.gridLayout[player.x + xChange][player.y + yChange];
                let door = component.door;

                if (door == null) {
                    return false; // The player can't be inside a block
                }

                if (xChange != 0) {
                    // True means: the player is moving in the x axis

                    if (!((this.player.x + xChange) == door.x && (this.player.y + yChange) == door.y && door.dir == "x")) {
                        // True means: There is not a dorr and the player wants move out the component. Then, the player can't move
                        return false;
                    }
                } else {
                    // True means: the player is moving in the y axis

                    if (!((this.player.x + xChange) == door.x && (this.player.y + yChange) == door.y && door.dir == "y")) {
                        // True means: There is not a dorr and the player wants move out the component. Then, the player can't move
                        return false;
                    }
                }
            }
        }

        this.player.setPosition(player.x + xChange, player.y + yChange);
        this.xOffset -= xChange * this.boxSize;
        this.yOffset -= yChange * this.boxSize;

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