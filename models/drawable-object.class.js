/**
 * Represents a drawable object in the game.
 * This class provides basic properties and methods for objects that can be drawn on the canvas.
 */
class DrawableObject {
    /**
     * The x-coordinate of the object.
     * @type {number}
     */
    x = 120;

    /**
     * The y-coordinate of the object.
     * @type {number}
     */
    y = 250;

    /**
     * The image of the object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * The height of the object.
     * @type {number}
     */
    height = 150;

    /**
     * The width of the object.
     * @type {number}
     */
    width = 100;

    /**
     * Cache for storing multiple images.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Index of the current image in animation sequences.
     * @type {number}
     */
    currentImage = 0;
    
    /**
     * Loads a single image.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        imagesToLoad++;
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images and stores them in the imageCache.
     * @param {string[]} array - An array of image paths.
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object on the given context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    /**
     * Sets the percentage and updates the image accordingly.
     * @param {number} percentage - The percentage value (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolvePercentage()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current percentage.
     * @returns {number} The index of the image to use.
     */
    resolvePercentage() {
        if (this.percentage === 100) {
            return 5;
        } else if(this.percentage >= 70) {
            return 4;
        } else if(this.percentage >= 50) {
            return 3;
        } else if(this.percentage >= 30) {
            return 2;
        } else if(this.percentage >= 10) {
            return 1;
        } else {
            return 0;
        }
    }
}