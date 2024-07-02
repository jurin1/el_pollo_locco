/**
 * @class BackgroundObject
 * @extends MovableObject
 * @classdesc Represents a background object in the game.
 */
class BackgroundObject extends MovableObject {
    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * Creates an instance of BackgroundObject.
     * @param {string} imagePath - The path to the image file for this background object.
     * @param {number} x - The initial x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super();
        
        /**
         * Loads the image for this background object.
         * @type {void}
         */
        this.loadImage(imagePath);

        /**
         * The x-coordinate of the background object.
         * @type {number}
         */
        this.x = x;

        /**
         * The y-coordinate of the background object.
         * Calculated to position the object at the bottom of the game area.
         * @type {number}
         */
        this.y = 480 - this.height;
    }
}