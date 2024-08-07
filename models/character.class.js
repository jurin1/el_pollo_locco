/**
 * Represents a character in the game, extending from MovableObject.
 */
class Character extends MovableObject {
    /**
     * Y position of the character.
     * @type {number}
     */
    y = 160;

    /**
     * Height of the character.
     * @type {number}
     */
    height = 280;

    /**
     * Width of the character.
     * @type {number}
     */
    width = 110;

    /**
     * Speed of the character.
     * @type {number}
     */
    speed = 5;

    /**
     * Energy level of the character.
     * @type {number}
     */
    energy = 100;

    /**
     * Array of image paths for walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array of image paths for jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Array of image paths for hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Array of image paths for dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Array of image paths for idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
     * Array of image paths for long idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Elapsed time in milliseconds.
     * @type {number}
     */
    elapsedTime = 5000;

    /**
     * Start time in milliseconds.
     * @type {number}
     */
    startTime = 15000;

    /**
     * Offset object for character bounding box.
     * @type {{ left: number, right: number, top: number, bottom: number }}
     */
    offset = {
        left: 10,
        right: 20,
        top: 110,
        bottom: 10
    };

    /**
     * AudioManager instance for managing audio.
     * @type {AudioManager}
     */
    audioManager = new AudioManager();

    /**
     * Initializes the character.
     * Loads the initial image and all animation images.
     * Starts the animation and applies gravity.
     * Checks if the character is dead and resets the timer.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.applyGravity();
        this.isDead();
    }

    /**
     * Initializes the animation loop.
     * Sets up intervals for moving and animating the character.
     * Moving interval updates position and state.
     * Animation interval updates animation state.
     */
    animate() {
        setStoppableInterval(() => this.movingCharacter(), 1000 / 60);
        setStoppableInterval(() => this.animateCharacter(), 100);
    }

    /**
     * Updates the character's movement and state.
     * Checks user input and updates position and animation.
     * Updates camera position to follow the character.
     */
    movingCharacter() {
        if (!world.gamePaused) {
            this.audioManager.pauseAudio('walkingSound');
            if (this.canMoveRight())
                this.moveRight();
            if (this.canMoveLeft())
                this.moveLeft();
            if (this.canJump())
                this.jump();
            if (this.isCharacterActive())
                this.resetTimer();
            world.camera_x = -this.x + 100;
        }
    }

    /**
     * Updates the character's animation state.
     * Checks for various conditions like death, hurt, jumping, walking, idling, and long idling.
     */
    animateCharacter() {
        if (!world.gamePaused) {
            this.updateStartTime();
            this.playAnimation(this.IMAGES_IDLE);
            if (this.isDead()) {
                this.handleDeadState();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.checkIfCharacterIsJumping()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.characterIsWalking()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.checkIfCharacterIsWaiting()) {
                this.playAnimation(this.IMAGES_IDLE_LONG);
                this.audioManager.playAudio('snoring', 1);
            }
        }
    }

    /**
     * Updates the start time by decrementing it by 100 milliseconds.
     */
    updateStartTime() {
        if (this.startTime > 0) {
            this.startTime -= 100;
        }
    }

    /**
     * Handles the character's dead state.
     * Plays the dead animation and sets the character image to the final dead frame.
     */
    handleDeadState() {
        this.playAnimation(this.IMAGES_DEAD);
        this.isDeadImg();
    }

    /**
     * Checks if the character can move to the right.
     * @returns {boolean} True if the character can move right, false otherwise.
     */
    canMoveRight() {
        return keyboard.RIGHT && this.x < world.level.level_end_x;
    }

    /**
     * Moves the character to the right.
     * Plays walking sound and sets direction.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.audioManager.playAudio('walkingSound', 1);
    }

    /**
     * Checks if the character can move to the left.
     * @returns {boolean} True if the character can move left, false otherwise.
     */
    canMoveLeft() {
        return keyboard.LEFT && this.x > -600;
    }

    /**
     * Moves the character to the left.
     * Plays walking sound and sets direction.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.audioManager.playAudio('walkingSound');
    }

    /**
     * Checks if the character can jump.
     * @returns {boolean} True if the character can jump, false otherwise.
     */
    canJump() {
        return keyboard.UP && !this.isAboveGround();
    }

    /**
     * Executes the character's jump action.
     * Plays jump sound.
     */
    jump() {
        super.jump();
        this.audioManager.playAudio('jumpSound');
    }

    /**
     * Checks if any movement keys are active.
     * @returns {boolean} True if any movement key is active, false otherwise.
     */
    isCharacterActive() {
        return keyboard.UP || keyboard.RIGHT || keyboard.LEFT || keyboard.SPACE;
    }

    /**
     * Checks if the character is walking.
     * @returns {boolean} True if the character is walking, false otherwise.
     */
    characterIsWalking() {
        return keyboard.RIGHT || keyboard.LEFT;
    }

    /**
     * Resets the start time to the elapsed time.
     */
    resetTimer() {
        this.startTime = this.elapsedTime;
    }

    /**
     * Checks if the character is jumping.
     * @returns {boolean} True if the character is jumping, false otherwise.
     */
    checkIfCharacterIsJumping() {
        return this.isAboveGround();
    }

    /**
     * Checks if the character is waiting (idle).
     * @returns {boolean} True if the character is waiting, false otherwise.
     */
    checkIfCharacterIsWaiting() {
        return this.startTime <= 0 ? true : this.audioManager.pauseAudio('snoring');
    }

    /**
     * Sets the character image to the final dead frame after a delay.
     */
    isDeadImg() {
        setTimeout(() => this.loadImage('img/2_character_pepe/5_dead/D-57.png'), 1000);
    }
}
