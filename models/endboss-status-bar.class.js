/**
 * Represents the status bar for the end boss in the game.
 * @extends DrawableObject
 */
class EndbossStatusBar extends DrawableObject {
    /**
     * Array of image paths for different states of the end boss status bar.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    /**
     * The x-coordinate of the status bar.
     * @type {number}
     */
    x = 495;

    /**
     * The y-coordinate of the status bar.
     * @type {number}
     */
    y = 20;

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
     * The current percentage of the end boss's health.
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates a new EndbossStatusBar instance.
     * Loads the icon image and the status bar images, and sets the initial percentage to 100.
     */
    constructor() {
        super();
        this.loadImage('img/7_statusbars/3_icons/icon_health_endboss.png');
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    /**
     * Decreases the energy of the end boss status bar based on the enemy's energy.
     * @param {Object} enemy - The enemy object.
     */
    decreaseEnergyOfEndbossStatusBar(enemy) {
        if (enemy instanceof Endboss) {
            this.setPercentage(enemy.energy);
        } else {
            return;
        }
    }
}