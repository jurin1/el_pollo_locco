/**
 * @class BottleStatusBar
 * @extends DrawableObject
 * @classdesc Represents the status bar for bottle collection in the game.
 */
class BottleStatusBar extends DrawableObject {
    /**
     * Array of image paths for different states of the bottle status bar.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    /**
     * The x-coordinate of the status bar.
     * @type {number}
     */
    x = 20;

    /**
     * The y-coordinate of the status bar.
     * @type {number}
     */
    y = 60;

    /**
     * The width of the status bar.
     * @type {number}
     */
    width = 200;

    /**
     * The height of the status bar.
     * @type {number}
     */
    height = 50;

    /**
     * Creates an instance of BottleStatusBar.
     * Loads the images and sets the initial percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }
}