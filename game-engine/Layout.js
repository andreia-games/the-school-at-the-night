/*
 * The Layout class controls all the graphic structure of the game. 
 * It creates a two dimensional Array that respresents the grid of the game. 
 * Each entry contains the componet that is in that position
 */
class Layout {

    /**
     * Controls the graphic structure of the game. Recive the propeties of the layout.
     * It should be called on the preloader function of the skecth
     * 
     * @param {Number} boxWidth - The width (pixels) of each grid entry.
     * @param {Number} boxHeight - The height (pixels) of each grid entry.
     * @param {Number} gridWidth  - The numbers (int) of collums of the grid.
     * @param {Number} gridHeight - The numbers (int) of rows of the grid.
     * @param {JSON} dataJSON - The definition of the diferents componets
     */
    constructor(gridWidth, gridHeight, boxWidth, boxHeight, dataJSON, color) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.boxWidth = boxWidth;
        this.boxHeight = boxHeight;
        this.dataJSON = dataJSON;

        // BackColor it's the default color of the backgroud
        this.backColor = color;

        // The componets list stores all the componets of the layout
        // All of this componets must be created in the setup method called on the stup fuction of the skecth
        this.componets = [];
        this.player = null;
        this.gameConsole = null;

        // Creatate a 2d array that represents the layout
        // Each entry is one of the 'boxes' of the screan
        // If the entry is empty (0) that box has nothing
        // If the box is no empty, it has the name of a componet
        this.gridLayout = [];
        for (let col = 0; col <= this.gridWidth; col++) {

            this.gridLayout[col] = []; // Make grid 2d Array
            for (let row = 0; row <= this.gridHeight; row++) {
                this.gridLayout[col][row] = 0;
            }
        }
    }

    /**
     * Reads the JSON and get all of the defined componets.
     * Having a componet this method get all its positions to update the grid and the componets list
     * This method should be called in the setup functon of the skecth
     */
    setup() {
        // Read all and get componets
        for (let key of Object.keys(this.dataJSON)) {
            let layoutComponet = this.dataJSON[key];

            // Get all the position of a componet
            for (let position of layoutComponet.position) {

                // Save the componet
                let componet = new Componet(
                    layoutComponet.name,
                    position.x,
                    position.y,
                    layoutComponet.width,
                    layoutComponet.height,
                    layoutComponet.spriteURL,
                    layoutComponet.obstacle
                );

                if (!this.setComponet(componet)) {
                    console.log("Can't create this componet: ");
                    console.log("name: ", componet.name, "x: " + componet.x, "y: " + componet.y)
                }
            }
        }
    }

    /**
     * This method should be called in the draw function of the skecht
     * Once called, thi method draw all the componets of the layout
     */
    draw() {
        background(this.backColor);

        for (let componet of this.componets) {
            image(componet.sprite,
                componet.x * this.boxWidth,
                componet.y * this.boxHeight,
                componet.width * this.boxWidth,
                componet.height * this.boxHeight);
        }

        if (this.player != null) {
            image(this.player.sprite,
                this.player.x * this.boxWidth,
                this.player.y * this.boxHeight,
                this.player.width * this.boxWidth,
                this.player.height * this.boxHeight);

        }
    }


    availableSpace(x, y, w, h) {
        for (let posx = x; posx < x + w; posx++) {
            for (let posy = y; posy < y + h; posy++) {
                if (this.gridLayout[posx][posy] = undefined || this.gridLayout[posx][posy] != 0) {
                    console.log("Can't move this componet because it outside the grid or there is alredy a componet there");
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Adds a componet to the layout
     * 
     * @parm {Componet} componet
     */
    setComponet(componet) {
        if (this.availableSpace(componet.x, componet.y, componet.width, componet.height)) {
            this.componets.push(componet);
            if (componet.obstacle) {
                this.setComponetToGrid(componet);
            }
            return true;
        }
        return false;
    }

    /**
     * Add the name of the componet to the grid
     * Doing this, this object is and obstacle
     * 
     * @param {Componet} componet
     */
    setComponetToGrid(componet) {
        for (let x = componet.x; x < componet.x + componet.width; x++) {
            for (let y = componet.y; y < componet.y + componet.height; y++) {
                this.gridLayout[x][y] = componet.name;
            }
        }
    }

    /**
     * Set a player to the layout
     * 
     * @param {DefaultPlayer} player 
     */
    setPlayer(player) {
        this.player = player;
        this.setComponetToGrid(this.player);
    }

    /**
     * Remuve the player
     */
    removePlayer() {
        this.player = null;
    }

    /**
     * 
     * @param {Componet} componet 
     * @param {Number} x - new x position 
     * @param {Number} y - new y position
     */
    changeComponetPosition(componet, x, y) {
        // Confirm that new position is in the grid
        if (this.availableSpace(x, y, componet.width, componet.height)) {
            // remove old position in grid
            for (let posx = componet.x; posx < componet.x + componet.width; posx++) {
                for (let posy = componet.y; posy < componet.y + componet.height; posy++) {
                    this.gridLayout[posx][posy] = 0;
                }
            }

            // Set new position in grid
            componet.x = x;
            componet.y = y;
            this.setComponetToGrid(componet);
        }
    }


    /**
     * This method draws the grid and the (x, y) position of each box
     * 
     */
    drawGridData() {
        strokeWeight(1);

        for (let x = 0; x <= this.gridWidth; x++) {
            for (let y = 0; y <= this.gridHeight; y++) {
                // Draw a box of the entry
                fill(255, 255, 255);
                rect(x * this.boxWidth, y * this.boxHeight, this.boxWidth, this.boxHeight);

                // Draw the position of the entry
                fill(0);
                text(x + "," + y,
                    x * this.boxWidth, y * this.boxHeight, this.boxWidth, this.boxHeight);
            }
        }
    }

    /**
     * Draws the grid and in each entry shows the name of the componet
     */
    drawGridComponetsData() {
        strokeWeight(1);

        for (let x = 0; x <= this.gridWidth; x++) {
            for (let y = 0; y <= this.gridHeight; y++) {
                // Draw a box of the entry
                fill(255, 255, 255);
                rect(x * this.boxWidth, y * this.boxHeight, this.boxWidth, this.boxHeight);

                // Draw the position of the entry
                fill(0);
                text(this.gridLayout[x][y],
                    x * this.boxWidth, y * this.boxHeight, this.boxWidth, this.boxHeight);
            }
        }
    }
}