class Componet {
    /**
     * A layout componet
     * 
     * @param {String} name - The name of the componet
     * @param {Number} x - The default position
     * @param {Number} y - The default position
     * @param {Number} width - The numbers of boxes
     * @param {Number} height - The numbers of boxes
     * @param {String} sprite - The image/gif of the componet
     * 
     */
    constructor(name, x, y, width, height, spriteURL, obstacle) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.obstacle = obstacle;
        if (spriteURL != null) this.sprite = loadImage(spriteURL);

        // Actions is an JavaScript Object that stores the action the componet can do
        // This actions is made by the player activate by user actions (keypresed, onclick, etc)
        // stucture of the items key: function() {code}
        // If the componet is a player, the action are made by it
        // each key in an event 
        this.actions = {}
    }
}