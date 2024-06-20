/**
 * Represents a Chicken enemy in the game.
 * 
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /**
     * The y-coordinate of the chicken.
     * @type {number}
     */
    y = 350;

    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 70;

    /**
     * The height of the chicken.
     * @type {number}
     */
    height = 80;

    /**
     * The energy level of the chicken.
     * @type {number}
     */
    energy = 2;

    /**
     * The offset of the chicken's collision box.
     * @type {{left: number, right: number, top: number, bottom: number}}
     */
    offset = {
        left: 0,
        right: 0,
        top: 5,
        bottom: 10
    };

    /**
     * An array of image paths for the chicken's walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * The image path for the chicken's dead state.
     * @type {string}
     */
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    /**
     * An instance of the AudioManager class.
     * @type {AudioManager}
     */
    audioManager = new AudioManager();

    /**
     * Creates a new Chicken instance.
     * 
     * @param {number} x The initial x-coordinate of the chicken.
     */
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.className = 'chicken';
        // this.audioManager.playAudio('chickenSound')
        this.x = x;
        this.speed = 0.15 + Math.random() * 1; // gives out a random speed for each chicken
        this.loadImages(this.IMAGES_WALKING); // loads the image pathes into an JSON
        this.animate(); 
    }

    /**
     * Animates the chicken.
     */
    animate() {
        const moveInterval = setInterval(() => {
            if (!world.gamePaused && gameStarted && !world.isGameOver) this.moveLeft();
        }, 1000 / 60);
        const animateInterval = setInterval(() => {
            if (!world.gamePaused && !world.isGameOver) this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        setStoppableInterval(() => this.enemyKill(this.energy, moveInterval, animateInterval, this.IMAGE_DEAD), 200);
    }
}