/**
 * Represents a cloud object in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /**
     * The y-coordinate of the cloud.
     * @type {number}
     */
    y = 20;

    /**
     * The width of the cloud.
     * @type {number}
     */
    width = 500;

    /**
     * The height of the cloud.
     * @type {number}
     */
    height = 250;

    /**
     * Creates a new Cloud instance.
     * @param {number} x - The initial x-coordinate of the cloud.
     */
    constructor(x) {
        super();
        
        /**
         * Loads the cloud image.
         */
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        
        /**
         * The x-coordinate of the cloud.
         * @type {number}
         */
        this.x = x;
        
        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left at regular intervals.
     * The cloud only moves when the game is not paused.
     */
    animate() {
        setStoppableInterval(() => {
            if (!world.gamePaused) this.moveLeft()
        }, 1000 / 60);
    }
}