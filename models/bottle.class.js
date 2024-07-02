/**
 * @class Bottle
 * @extends DrawableObject
 * @classdesc Represents a bottle object in the game.
 */
class Bottle extends DrawableObject {
    /**
     * The width of the bottle.
     * @type {number}
     */
    width = 50;

    /**
     * The height of the bottle.
     * @type {number}
     */
    height = 90;

    /**
     * The y-coordinate of the bottle.
     * @type {number}
     */
    y = 340;

    /**
     * The offset values for collision detection.
     * @type {{left: number, right: number, top: number, bottom: number}}
     */
    offset = {
        left: 20,
        right: 8,
        top: 15,
        bottom: 8
    }

    /**
     * Creates an instance of Bottle.
     * Loads the bottle image and sets a random x-coordinate.
     */
    constructor() {
        super();
        
        /**
         * Loads the image for the bottle.
         * @type {void}
         */
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');

        /**
         * Sets a random x-coordinate for the bottle.
         * The bottle will be placed between 400 and 2200 pixels from the left edge.
         * @type {number}
         */
        this.x = 400 + Math.random() * 1800;
    }
}