/**
 * @class ChickenSmall
 * @extends MovableObject
 * @classdesc Represents a small chicken enemy in the game.
 */
class ChickenSmall extends MovableObject {
    /**
     * The width of the small chicken.
     * @type {number}
     */
    width = 50;

    /**
     * The height of the small chicken.
     * @type {number}
     */
    height = 60;

    /**
     * The y-coordinate of the small chicken.
     * @type {number}
     */
    y = 370;

    /**
     * The energy level of the small chicken.
     * @type {number}
     */
    energy = 1;

    /**
     * The offset values for collision detection.
     * @type {{left: number, right: number, top: number, bottom: number}}
     */
    offset = {
        left: 5,
        right: 10,
        top: 5,
        bottom: 10
    }

    /**
     * Array of image paths for walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    /**
     * Image path for the dead state.
     * @type {string}
     */
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    /**
     * Audio manager for chicken sounds.
     * @type {AudioManager}
     */
    audioManager = new AudioManager();

    /**
     * Creates an instance of ChickenSmall.
     * @param {number} x - The initial x-coordinate of the small chicken.
     */
    constructor(x) {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = x;
        this.speed = 0.15 + Math.random() * 1;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.isDead();
    }

    /**
     * Initializes the animation loop for the small chicken.
     * This method sets up intervals for movement and animation.
     * It also checks for the chicken's death state.
     */
    animate() {
        const moveInterval = setInterval(() => {
            if (!world.gamePaused && gameStarted && !world.isGameOver) this.moveLeft();
        }, 1000 / 60);

        const animateInterval = setInterval(() => {
            if (!world.gamePaused && !world.isGameOver) this.playAnimation(this.IMAGES_WALKING)
        }, 200);

        setStoppableInterval(() => this.enemyKill(this.energy, moveInterval, animateInterval, this.IMAGE_DEAD), 200);
    }
}