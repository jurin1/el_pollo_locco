class Character extends MovableObject {
    y = 160;
    height = 280;
    width = 110;
    speed = 5;
    energy = 100;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
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
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
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
    elapsedTime = 5000;
    startTime = 15000;
    offset = {
        left: 10,
        right: 20,
        top: 110,
        bottom: 10
    }
    audioManager = new AudioManager();



    /**
     * Initializes the character.
     * Loads the initial image and all animation images.
     * Starts the animation and applies gravity.
     * Checks if the character is dead and resets the timer.
     * 
     * @memberof Character
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
        // this.resetTimer();
    }


    /**
     * Initializes the animation loop.
     * 
     * This method sets up two intervals that will repeatedly call the
     * movingCharacter and animateCharacter methods.
     * 
     * The movingCharacter method updates the character's position and state.
     * The animateCharacter method updates the character's animation state.
     * 
     * Both methods are called repeatedly to create the animation loop.
     * 
     * @memberof Character
     */
    animate() {
        setStoppableInterval(() => this.movingCharacter(), 1000 / 60);
        setStoppableInterval(() => this.animateCharacter(), 100);
    }


    /**
     * Updates the character's movement and state.
     * 
     * This method checks for user input and updates the character's position and animation state accordingly.
     * It also updates the camera position to follow the character.
     * 
     * @memberof Character
     */
    movingCharacter() {
        if(!world.gamePaused){
            this.audioManager.pauseAudio('walking_sound');
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
     * 
     * This method updates the character's animation based on its current state.
     * It checks for various conditions such as death, hurt, jumping, walking, idling, and long idling.
     * 
     * @memberof Character
     */
    animateCharacter() {
    if (!world.gamePaused) {
        this.updateStartTime();
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
        }
    }
    
}

updateStartTime() {
    if (this.startTime > 0) {
        this.startTime -= 100;
    }
}

handleDeadState() {
    this.playAnimation(this.IMAGES_DEAD);
    this.isDeadImg();
    }


    /**
     * Checks if the character can move to the right.
     * 
     * This method checks if the game is not paused, the right arrow key is pressed, and the character's x position is less than the level's end x position.
     * 
     * @returns {boolean} True if the character can move right, false otherwise.
     */
    canMoveRight() {
        return keyboard.RIGHT && this.x < world.level.level_end_x;
    }


    moveRight() {
        this.test = 60;
        super.moveRight();
        this.otherDirection = false;
        this.audioManager.playAudio('walking_sound', 1);
    }


    canMoveLeft() {
        return keyboard.LEFT && this.x > -600;
    }


    moveLeft() {
        this.test2 = 560;
        super.moveLeft();
        this.otherDirection = true;
        this.audioManager.playAudio('walking_sound');
    }


    canJump() {
        return keyboard.UP && !this.isAboveGround();
    }


    jump() {
        super.jump();
        this.audioManager.playAudio('jump_sound');
    }


    isCharacterActive() {
        return keyboard.UP || keyboard.RIGHT || keyboard.LEFT || keyboard.SPACE;
    }


    characterIsWalking() {
        return keyboard.RIGHT || keyboard.LEFT ;
    }


    resetTimer() {
        this.startTime = this.elapsedTime;
    }


    checkIfCharacterIsJumping() {
        return this.isAboveGround();
    }


    checkIfCharacterIsWaiting() {
        return this.startTime <= 0;
    }


    // checkIfCharIsIdle() {
    //     return !world.gamePaused;
    // }

    
    isDeadImg() {
        setTimeout(() => this.loadImage('img/2_character_pepe/5_dead/D-57.png'), 1000);
    }
}
