/**
 * Represents a throwable object, such as a bottle, in the game.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    x = 100;
    y = 340;
    width = 50;
    height = 90;
    offset = {
        left: 20,
        right: 8,
        top: 15,
        bottom: 8
    }
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    throw_animation;

    /**
     * Creates an instance of the ThrowableObject class.
     * @param {number} x - The initial x position of the object.
     * @param {number} y - The initial y position of the object.
     * @param {boolean} otherDirection - The direction to throw the object.
     * @param {number} speed - The speed of the thrown object.
     */
    constructor(x, y, otherDirection, speed) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw(x, y, otherDirection, speed);
        this.animate();
    }

    /**
     * Initiates the throwing action for the object.
     * @param {number} x - The initial x position of the object.
     * @param {number} y - The initial y position of the object.
     * @param {boolean} otherDirection - The direction to throw the object.
     * @param {number} speed - The speed of the thrown object.
     */
    throw(x, y, otherDirection, speed) {
        this.x = x;
        this.y = y;
        this.speedY = 25;
        this.applyGravity();
        this.throw_animation = setInterval(() => { 
            if(!otherDirection) {
                this.x += speed;
            } else {
                this.x -= speed;
            }
        }, 50);
    }

    /**
     * Animates the throwable object by rotating and splashing it.
     */
    animate() {
        setStoppableInterval(() => {
            this.rotateBottle();
            this.splashBottle();
        }, 100);
    }

    /**
     * Rotates the bottle during its flight.
     */
    rotateBottle() {
        this.playAnimation(this.IMAGES_ROTATION);
    }

    /**
     * Plays the splash animation when the bottle hits the ground.
     */
    splashBottle() {
        if (this.y > 320) {
            this.playAnimation(this.IMAGES_SPLASH);
        }
    }
}
