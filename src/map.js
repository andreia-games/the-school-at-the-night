class GameMap {

    Component = class {
        /**
         * 
         * @param {String} name
         * @param {Number} x 
         * @param {Number} y 
         * @param {Number} width 
         * @param {Number} height 
         * @param {String} type 
         */
        constructor(name, x, y, width, height, door) {
            this.name = name;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.door = door;
        }
    }

    /**
     * The game map rendes the game UI and controls the player motion. 
     * To do that, it use and 2d array that represent the sctruture of the map.
     * 
     * @param {String}  mapName      The name of the map.
     * @param {Number}  width        The number of collums.
     * @param {Number}  height       The number of rows.
     * @param {Number}  boxSize      The width and height of each box.
     * @param {JSON}    componetsJSON  The JSON that specify the componets of the map. 
     */
    constructor(mapName, width, height, boxSize, componetsJSON) {
        this.mapName = mapName;
        this.width = width;
        this.height = height;
        this.boxSize = boxSize;
        this.componetsJSON = componetsJSON;

        this.xOffset = 0;
        this.yOffset = 0;

        this.player = null;
        this.components = null;

        this.gridLayout = this.createGrid(width, height);
        this.createLayout();
    }


    /**
     * Creates an 2d matrix of 0s.
     * 
     * @param {Number} width    number of collums.
     * @param {Number} height   number of row.
     * @returns                 2d Matrix.
     */
    createGrid(width, height) {
        let matrix = []; // Make and 2d Array

        for (let col = 0; col <= width; col++) {
            matrix[col] = [];  // Add an empty row to the collum
            for (let row = 0; row <= height; row++) {
                matrix[col][row] = null;
            }
        }

        return matrix;
    }

    /**
     * Read all the JSON to get The diferent componets
     */
    createLayout() {
        // Iterate by component in the JSON
        for (let key of Object.keys(this.componetsJSON)) {
            let componetJSON = this.componetsJSON[key];

            // Itere by the positions of the componets
            for (let position of componetJSON.position) {

                if (componetJSON.type != "background") {
                    // Create a new component and add the poiter to the object in the grid
                    let component = new this.Component(componetJSON.name, position.x, position.y, componetJSON.width, componetJSON.height, componetJSON.door);

                    for (let x = component.x; x < component.x + component.width; x++) {
                        for (let y = component.y; y < component.y + component.height; y++) {
                            if (this.gridLayout[x][y] != null) {
                                console.error("There is alredy a component here." +
                                    "\nTry create: " + key + " on x: " + x + " y: " + y +
                                    "\nTrying create: ", componetJSON.name +
                                "\nExisting comopent: ", this.gridLayout[x][y]);
                            } else {
                                this.gridLayout[x][y] = component;
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * Add an player to the game map.
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

    movePlayer(xChange, yChange) {
        // The logic of the motion is composed by two kind of moments:
        // 1. The player is inside an component
        // 2. Th player is not in an component

        if (!(player.x + xChange >= 0 && player.x + xChange <= this.width && player.y + yChange >= 0 && player.y + yChange <= this.height)) {
            // The momvent is not pisiblle cause new position is out the grid
            return false;
        }

        if (this.gridLayout[this.player.x][this.player.y] != null) {
            // True means: The player is inside a component
            // If the player is inside a component it can move inside the limits of the componet
            // But if the player is in the borders of the component it can move outside without a door


            let component = this.gridLayout[this.player.x][this.player.y];
            let door = component.door;

            if (door == null) return false; // The is not a door, the player can't move

            if (xChange != 0) {
                // True means: the player is moving in the x axis

                if (!(this.player.x == door.x && this.player.y == door.y && door.dir == "x") && (this.gridLayout[this.player.x + xChange][this.player.y + yChange] != component)) {
                    // True means: There is not a dorr and the player wants move out the component. Then, the player can't move
                    return false;
                }
            } else {
                // True means: the player is moving in the y axis

                if (!(this.player.x == door.x && this.player.y == door.y && door.dir == "y") && (this.gridLayout[this.player.x + xChange][this.player.y + yChange] != component)) {
                    // True means: There is not a dorr and the player wants move out the component. Then, the player can't move
                    return false;
                }
            }
        } else {
            // True means: The player is not in a component
            // If the player is not in a component is can move everypart but walls
            // If the player wants to go in a component, there must be a door

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
    /**
     * Draw the grid, the position of each entry and the componet that is there
     */
    drawGrid() {
        translate(this.xOffset, this.yOffset);
        background(color('black'));
        for (let x = 0; x <= this.width; x++) {

            for (let y = 0; y <= this.height; y++) {
                fill(color('white'))
                strokeWeight(1);
                rect(x * this.boxSize, y * this.boxSize, this.boxSize, this.boxSize);

                // Draw the position of the entry
                fill(color('gray'));
                if (this.gridLayout[x][y] != null)
                    text(x + "," + y + "\n" + this.gridLayout[x][y].name, x * this.boxSize, y * this.boxSize, this.boxSize, this.boxSize);
                else
                    text(x + "," + y + "\n", x * this.boxSize, y * this.boxSize, this.boxSize, this.boxSize);
            }
        }
    }

    windowResized() {
        this.xOffset = -player.x * this.boxSize + floor(windowWidth / 2);
        this.yOffset = -player.y * this.boxSize + floor(windowHeight / 2);
    }
}