/**
 * Represents the end boss in the game, extending MovableObject.
 * Provides functionality for the end boss's animations, movements, and interactions.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 50;
    energy = 100;
    speed = 6;
    offset = {
        left: 15,
        right: 20,
        top: 80,
        bottom: 30
    };
    positionEnd = false;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    chicken_sound = new Audio('audio/endbossHurt.mp3');

    /**
     * Constructs an Endboss object and loads its images.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 2500;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        setTimeout(() => this.animate(), 5000);
    }

    /**
     * Starts the end boss's animations and movements.
     */
    animate() {
        const moveInterval = setInterval(() => {
            if (!world.gamePaused) this.movingEndboss();
        }, 1000 / 60);
        setStoppableInterval(() => {
            if (!world.gamePaused) this.animateEndboss(moveInterval);
        }, 200);
    }

    /**
     * Initiates the end boss fight if conditions are met.
     */
    startEndBoss() {
        if (this.canEndbossStart()) {
            setMusic('endbossFightSound');
            world.endbossFight = true;
            setTimeout(() => this.positionEnd = true, 2500);
        }
    }

    /**
     * Plays the dead animation for the end boss.
     * @param {number} mI - Unused parameter.
     */
    endBossDead(mI) {
        this.playAnimation(this.IMAGES_DEAD);
    }

    /**
     * Handles the movement of the end boss based on the character's position.
     */
    movingEndboss() {
        if (this.isCharacterAtTheEnd()) {
            this.moveLeft();
        }
        if (this.isCharacterNear()) {
            this.moveRight();
        }
    }

    /**
     * Animates the end boss based on its state.
     * @param {number} mI - Unused parameter.
     */
    animateEndboss(mI) {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (!this.positionEnd) {
            this.playAnimation(this.IMAGES_ALERT);
        } else if (world.character.isHurt()) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.energy <= 0) {
            this.endBossDead(mI);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
        this.startEndBoss();
    }

    /**
     * Checks if the character is at the end position.
     * @returns {boolean} - Returns true if the character is at the end position.
     */
    isCharacterAtTheEnd() {
        return (2500 - world.character.x) < 800 && this.x > world.character.x && this.positionEnd && gameStarted;
    }

    /**
     * Moves the end boss to the left.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = false;
    }

    /**
     * Checks if the character is near the end boss.
     * @returns {boolean} - Returns true if the character is near.
     */
    isCharacterNear() {
        return (2500 - world.character.x) > 800 && this.x < 2500 && this.positionEnd && gameStarted;
    }

    /**
     * Moves the end boss to the right.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = true;
    }

    /**
     * Checks if the end boss can start the fight.
     * @returns {boolean} - Returns true if the end boss can start.
     */
    canEndbossStart() {
        return (2500 - world.character.x) < 700;
    }
}
