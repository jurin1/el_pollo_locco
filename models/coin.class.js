/**
 * Represents a coin object in the game.
 * @extends DrawableObject
 */
class Coin extends DrawableObject {
    /**
     * The width of the coin.
     * @type {number}
     */
    width = 75;

    /**
     * The height of the coin.
     * @type {number}
     */
    height = 75;

    /**
     * The offset values for collision detection.
     * @type {{left: number, right: number, top: number, bottom: number}}
     */
    offset = {
        left: 12,
        right: 15,
        top: 18,
        bottom: 12
    }

    /**
     * Creates a new Coin instance.
     * Loads the coin image and sets a random position within a specified range.
     */
    constructor() {
        super();
        
        /**
         * Loads the coin image.
         */
        this.loadImage('img/7_statusbars/3_icons/icon_coin.png');
        
        /**
         * Sets a random x-coordinate for the coin between 550 and 2250.
         * @type {number}
         */
        this.x = 550 + Math.random() * 1700;
        
        /**
         * Sets a random y-coordinate for the coin between 150 and 350.
         * @type {number}
         */
        this.y = 150 + Math.random() * 200;
    }
}