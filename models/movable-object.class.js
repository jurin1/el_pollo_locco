/**
 * Represents a movable object in the game, extending DrawableObject.
 * Provides functionality for movement, collision detection, and gravity.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;
    collectedBottles = 0;
    collectedCoins = 0;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }

    /**
     * Applies gravity to the object, affecting its vertical position.
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if this object is colliding with another object.
     * @param {Object} obj - The other object to check collision with.
     * @returns {boolean} - Returns true if the objects are colliding.
     */
    isColliding(obj) {
        return (this.x + this.width) - this.offset.right > obj.x + obj.offset.left &&
            (this.y + this.height) - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width + obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height + obj.offset.bottom;
    }

    /**
     * Handles the logic when this object is hit.
     * @param {boolean} character - If true, decreases the object's energy.
     */
    hit(character) {
        if (character) this.energy -= 5;
        this.lastHit = new Date().getTime();
    }

    /**
     * Checks if this object is currently hurt.
     * @returns {boolean} - Returns true if the object is hurt.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.8;
    }

    /**
     * Checks if this object is dead.
     * @returns {boolean} - Returns true if the object's energy is 0.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Checks if this object is above the ground.
     * @returns {boolean} - Returns true if the object is above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 350;
        } else {
            return this.y < 160;
        }
    }

    /**
     * Moves the object to the right by increasing the x position.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decreasing the x position.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays an animation using a sequence of images.
     * @param {Array<string>} images - The array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Makes the object jump by setting a vertical speed.
     */
    jump() {
        this.speedY = 20;
    }

    /**
     * Changes the image of an enemy when its energy is depleted.
     * @param {number} energy - The current energy of the enemy.
     * @param {number} mI - Unused parameter.
     * @param {number} aI - Unused parameter.
     * @param {string} image - The image to load when the enemy is killed.
     */
    enemyKill(energy, mI, aI, image) {
        if (energy <= 0) {
            this.loadImage(image);
        }
    }
}
