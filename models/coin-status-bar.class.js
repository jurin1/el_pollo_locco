/**
 * Represents the coin status bar in the game.
 * @extends DrawableObject
 */
class CoinStatusBar extends DrawableObject {
    /**
     * Array of image paths for different states of the coin status bar.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];

    /**
     * The x-coordinate of the coin status bar.
     * @type {number}
     */
    x = 20;

    /**
     * The y-coordinate of the coin status bar.
     * @type {number}
     */
    y = 100;

    /**
     * The width of the coin status bar.
     * @type {number}
     */
    width = 200;

    /**
     * The height of the coin status bar.
     * @type {number}
     */
    height = 50;

    /**
     * Creates a new CoinStatusBar instance.
     * Loads the images and sets the initial percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }
}