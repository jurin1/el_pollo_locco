/**
 * Represents a status bar that displays the health or other status metrics of the player.
 * Extends DrawableObject to be drawn on the canvas.
 */
class StatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];
    x = 20;
    y = 20;
    width = 200;
    height = 50;

    /**
     * Constructs a StatusBar object.
     * Loads the images for the status bar and sets the initial percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}
