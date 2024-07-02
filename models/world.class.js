/**
 * Represents the game world.
 */
class World {
    audioManager = new AudioManager();
    character = new Character();
    level = level1;
    statusBar = new StatusBar();
    bottleStatusBar = new BottleStatusBar();
    coinStatusBar = new CoinStatusBar();
    endbossStatusBar = new EndbossStatusBar();
    throwableObject = [];
    gamePaused;
    ctx;
    canvas;
    keyboard;
    camera_x = -60;
    throwCooldown = 0;
    throwDelay = 1500;
    endbossFight = false;
    characterImmortal = false;
    isGameOver = false;
    oneItem = 10;

    /**
     * Creates an instance of the World class.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     * @param {Object} keyboard - The keyboard input object.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.run();
    }

    /**
     * Runs the main game loop.
     */
    run() {
        setStoppableInterval(() => {
            this.checkCollisionsWithEnemy();
            this.checkCollisionOfBottleWithEnemy();
            this.checkCollisionWithCollectible(this.level.bottles, this.character, "collectedBottles", this.bottleStatusBar, 'bottle_sound');
            this.checkCollisionWithCollectible(this.level.coins, this.character, "collectedCoins", this.coinStatusBar, 'coin_sound');
            this.throwBottle();
            this.checkForEndOfGame();
            this.bottleStatusBar.setPercentage(this.bottleStatusBar.percentage);
            if (this.throwCooldown > 0) this.throwCooldown -= 100;
        }, 50);
    }

    /**
     * Manages the logic for throwing bottles.
     */
    throwBottle() {
        if (this.checkForThrowingBottle('D', !this.character.otherDirection)) this.throwObj(20);
        if (this.checkForThrowingBottle('F', !this.character.otherDirection)) this.throwObj(8);
    }

    /**
     * Checks if a bottle can be thrown.
     * @param {string} key - The key for throwing the bottle.
     * @param {boolean} direction - The direction to throw the bottle.
     * @returns {boolean} - Returns true if the bottle can be thrown.
     */
    checkForThrowingBottle(key, direction) {
        return this.keyboard[key] && this.character.collectedBottles > 0 && this.throwCooldown <= 0 && !this.gamePaused && gameStarted && direction;
    }

    /**
     * Creates and throws a bottle object.
     * @param {number} speed - The speed of the thrown bottle.
     */
    throwObj(speed) {
        let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100, this.character.otherDirection, speed);
        this.throwableObject.push(bottle);
        this.character.collectedBottles -= this.oneItem;
        this.bottleStatusBar.percentage -= this.oneItem;
        this.audioManager.playAudio('throw_sound');
        this.throwCooldown = this.throwDelay;
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisionsWithEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.isCharacterCollidingWithEnemy(enemy)) this.characterHitsEnemy(enemy);
            if (this.isEnemyCollidingWithCharacter(enemy)) this.enemyHitsCharacter();
        });
    }

    /**
     * Checks for collisions between thrown bottles and enemies.
     */
    checkCollisionOfBottleWithEnemy() {
        if (this.throwableObject.length > 0) {
            this.level.enemies.forEach(enemy => {
                this.throwableObject.forEach(bottle => {
                    if (this.isBottleHittingEnemy(bottle, enemy)) {
                        this.handleBottleHitEnemy(bottle, enemy);
                        if (this.isEnemyDead(enemy)) {
                            this.enemyDies(enemy);
                        }
                    } else if (this.isBottleHittingGround(bottle, enemy)) {
                        this.bottleBreaking(bottle);
                    }
                });
            });
        }
    }

    /**
     * Checks if the character is colliding with an enemy.
     * @param {Object} enemy - The enemy to check collision with.
     * @returns {boolean} - Returns true if the character is colliding with the enemy.
     */
    isCharacterCollidingWithEnemy(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && enemy.energy > 0 && this.character.speedY < 0;
    }

    /**
     * Handles the logic when the character hits an enemy.
     * @param {Object} enemy - The enemy that was hit.
     */
    characterHitsEnemy(enemy) {
        enemy.energy--;
        enemy.hit();
        this.endbossStatusBar.decreaseEnergyOfEndbossStatusBar(enemy);
        this.character.jump();
        if (enemy.energy <= 0) {
            this.deleteEnemy(enemy);
            this.chickenSound(enemy);
        }
    }

    /**
     * Checks if an enemy is colliding with the character.
     * @param {Object} enemy - The enemy to check collision with.
     * @returns {boolean} - Returns true if the enemy is colliding with the character.
     */
    isEnemyCollidingWithCharacter(enemy) {
        return this.character.isColliding(enemy) && !this.character.isAboveGround() && this.character.energy > 0 && enemy.energy > 0 && !this.characterImmortal;
    }

    /**
     * Handles the logic when an enemy hits the character.
     */
    enemyHitsCharacter() {
        this.character.hit(true);
        this.audioManager.playAudio('hurt_sound');
        this.statusBar.setPercentage(this.character.energy);
        this.setImmortalTimer();
    }

    /**
     * Checks if a bottle is hitting an enemy.
     * @param {Object} bottle - The thrown bottle.
     * @param {Object} enemy - The enemy to check collision with.
     * @returns {boolean} - Returns true if the bottle is hitting the enemy.
     */
    isBottleHittingEnemy(bottle, enemy) {
        return bottle.isColliding(enemy) && enemy.energy > 0;
    }

    /**
     * Handles the logic when a bottle hits an enemy.
     * @param {Object} bottle - The thrown bottle.
     * @param {Object} enemy - The enemy that was hit.
     */
    handleBottleHitEnemy(bottle, enemy) {
        enemy.energy -= 5;
        this.breakingGlassSound();
        this.deleteBottle(bottle);
        enemy.hit();
        this.endbossStatusBar.decreaseEnergyOfEndbossStatusBar(enemy);
    }

    /**
     * Checks if an enemy is dead.
     * @param {Object} enemy - The enemy to check.
     * @returns {boolean} - Returns true if the enemy is dead.
     */
    isEnemyDead(enemy) {
        return enemy.energy <= 0;
    }

    /**
     * Handles the logic when an enemy dies.
     * @param {Object} enemy - The enemy that died.
     */
    enemyDies(enemy) {
        this.deleteEnemy(enemy);
        this.chickenSound(enemy);
    }

    /**
     * Deletes an enemy from the level after a delay.
     * @param {Object} enemy - The enemy to delete.
     */
    deleteEnemy(enemy) {
        setTimeout(() => this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1), 2000);
    }

    /**
     * Plays the appropriate sound for a chicken enemy.
     * @param {Object} enemy - The chicken enemy.
     */
    chickenSound(enemy) {
        if(enemy.className){
            this.audioManager.playAudio('chickenSound')
        } else{
            this.audioManager.playAudio('smallChickenSound')
        };
    }

    /**
     * Checks if a bottle is hitting the ground.
     * @param {Object} bottle - The thrown bottle.
     * @param {Object} enemy - The enemy (used for position check).
     * @returns {boolean} - Returns true if the bottle is hitting the ground.
     */
    isBottleHittingGround(bottle, enemy) {
        return !bottle.isColliding(enemy) && !bottle.isAboveGround();
    }

    /**
     * Handles the logic for a bottle breaking on the ground.
     * @param {Object} bottle - The thrown bottle.
     */
    bottleBreaking(bottle) {
        this.breakingGlassSound();
        this.deleteBottle(bottle);
    }

    /**
     * Checks for the end of the game.
     */
    checkForEndOfGame() {
        if (!this.checkIfEndboss()) this.gameOver('win_sound');
        if (this.character.energy == 0) this.gameOver('gameOver_sound');
    }

    /**
     * Handles the end of the game.
     * @param {string} sound - The sound to play at the end of the game.
     */
    gameOver(sound) {
        setTimeout(() => {
            stopGame();
            this.audioManager.playAudio(sound);
            this.isGameOver = true;
            stopAllIntervals();
        }, 1000);
    }

    /**
     * Sets a timer for character immortality.
     */
    setImmortalTimer() {
        this.characterImmortal = true;
        setTimeout(() => this.characterImmortal = false, 150);
    }

    /**
     * Checks if the endboss is present in the level.
     * @returns {boolean} - Returns true if the endboss is present.
     */
    checkIfEndboss() {
        return this.level.enemies.some(enemy => enemy instanceof Endboss);
    }

    /**
     * Plays the breaking glass sound.
     */
    breakingGlassSound() {
        this.audioManager.playAudio('breaking_glass_sound');
    }

    /**
     * Deletes a bottle from the throwable objects after a delay.
     * @param {Object} bottle - The thrown bottle to delete.
     */
    deleteBottle(bottle) {
        setTimeout(() => this.throwableObject.splice(this.throwableObject.indexOf(bottle)), 200);
    }

    /**
     * Checks for collisions with collectible items.
     * @param {Array} collectibles - The list of collectible items.
     * @param {Object} character - The character.
     * @param {string} countPropertyName - The property name for the collected count.
     * @param {Object} statusBar - The status bar to update.
     * @param {string} sound - The sound to play upon collection.
     */
    checkCollisionWithCollectible(collectibles, character, countPropertyName, statusBar, sound) {
        collectibles.forEach((collectible, index) => {
            if (this.isCharacterCollidingWithCollectable(collectible)) {
                this.collectItem(collectibles, index, character, countPropertyName, statusBar, sound);
            }
        });
    }

    /**
     * Checks if the character is colliding with a collectible item.
     * @param {Object} collectible - The collectible item.
     * @returns {boolean} - Returns true if the character is colliding with the collectible.
     */
    isCharacterCollidingWithCollectable(collectible) {
        return this.character.isColliding(collectible);
    }

    /**
     * Handles the logic for collecting an item.
     * @param {Array} collectibles - The list of collectible items.
     * @param {number} index - The index of the collected item.
     * @param {Object} character - The character.
     * @param {string} countPropertyName - The property name for the collected count.
     * @param {Object} statusBar - The status bar to update.
     * @param {string} sound - The sound to play upon collection.
     */
    collectItem(collectibles, index, character, countPropertyName, statusBar, sound) {
        if (character[countPropertyName] < 100) {
            collectibles.splice(index, 1);
            character[countPropertyName] += this.oneItem;
            statusBar.setPercentage(character[countPropertyName]);
            if (sound) this.audioManager.playAudio(sound, 1);
        }
    }

    /**
     * Draws the game world.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => {
            this.draw();
        });
        if(this.endbossFight) this.addToMap(this.endbossStatusBar);
    }

    /**
     * Adds multiple objects to the map.
     * @param {Array} object - The objects to add.
     */
    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the map.
     * @param {Object} mo - The movable object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) this.mirrowImage(mo);
        mo.draw(this.ctx);
        if (mo.otherDirection) this.mirrowImageReset(mo);
    }

    /**
     * Mirrors the image for objects facing the other direction.
     * @param {Object} mo - The movable object to mirror.
     */
    mirrowImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x *= -1;
    }

    /**
     * Resets the mirrored image for objects facing the other direction.
     * @param {Object} mo - The movable object to reset.
     */
    mirrowImageReset(mo) {
        mo.x *= -1;
        this.ctx.restore();
    }
}
