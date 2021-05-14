class Component {
    /**
     * 
     * @param {Number}  x       x position of the componet.
     * @param {Number}  y       y position of the componet.
     * @param {Number}  width   Number of collum of the componets.
     * @param {Number}  height  Number of rows of the componets.
     * @param {JSON}    door    Position and direction of the door.
     * @param {String}  type    Block or background
     * @param {Image}   img     Image of the component image.
     */
    constructor(x, y, width, height, door, type, img) {
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