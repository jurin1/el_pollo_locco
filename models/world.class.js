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
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.run();
    }


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
        }, 100);
    }


    throwBottle() {
        if (this.checkForThrowingBottle('D', !this.character.otherDirection)) this.throwObj(20);
        if (this.checkForThrowingBottle('D', this.character.otherDirection)) this.throwObj(20);
        if (this.checkForThrowingBottle('F', !this.character.otherDirection)) this.throwObj(8);
        if (this.checkForThrowingBottle('F', this.character.otherDirection)) this.throwObj(8);
    }

 
    checkForThrowingBottle(key, direction) {
        return keyboard[key] && this.character.collectedBottles > 0 && this.throwCooldown <= 0 && !this.gamePaused && gameStarted && direction;
    }


    throwObj(speed) {
        let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100, this.character.otherDirection, speed);
        this.throwableObject.push(bottle);
        this.character.collectedBottles = this.character.collectedBottles - this.oneItem;
        this.bottleStatusBar.percentage = this.bottleStatusBar.percentage - this.oneItem;
        this.audioManager.playAudio('throw_sound');
        this.throwCooldown = this.throwDelay;
    }

    checkCollisionsWithEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.isCharacterCollidingWithEnemy(enemy)) this.characterHitsEnemy(enemy);
            if (this.isEnemyCollidingWithCharacter(enemy)) this.enemyHitsCharacter();
        });
    }


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


    isCharacterCollidingWithEnemy(enemy) {
        return this.character.isCollidingOld(enemy) && this.character.isAboveGround() && enemy.energy > 0 && this.character.speedY < 0;
    }


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


    isEnemyCollidingWithCharacter(enemy) {
        return this.character.isCollidingOld(enemy) && !this.character.isAboveGround() && this.character.energy > 0 && enemy.energy > 0 && !this.characterImmortal;
    }


    enemyHitsCharacter() {
        this.character.hit(true);
        this.audioManager.playAudio('hurt_sound');
        this.statusBar.setPercentage(this.character.energy);
        this.setImmortalTimer();
    }


    isBottleHittingEnemy(bottle, enemy) {
        return bottle.isCollidingOld(enemy) && enemy.energy > 0;
    }


    handleBottleHitEnemy(bottle, enemy) {
        enemy.energy = enemy.energy - 5;
        this.breakingGlassSound();
        this.deleteBottle(bottle);
        enemy.hit();
        this.endbossStatusBar.decreaseEnergyOfEndbossStatusBar(enemy);
    }


    isEnemyDead(enemy) {
        return enemy.energy <= 0;
    }


    enemyDies(enemy) {
        this.deleteEnemy(enemy);
        this.chickenSound(enemy);
    }


    deleteEnemy(enemy) {
        setTimeout(() => this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1), 2000);
    }


    chickenSound(enemy) {
        if(enemy.className){
            this.audioManager.playAudio('chickenSound')
        } else{
            this.audioManager.playAudio('smallChickenSound')
        };
    }


    isBottleHittingGround(bottle, enemy) {
        return !bottle.isCollidingOld(enemy) && !bottle.isAboveGround();
    }


    bottleBreaking(bottle) {
        this.breakingGlassSound();
        this.deleteBottle(bottle);
    }


    checkForEndOfGame() {
        if (!this.checkIfEndboss()) this.gameOver('win_sound');
        if (this.character.energy == 0) this.gameOver('gameOver_sound');
    }


    gameOver(sound) {
        setTimeout(() => {
            stopGame();
            this.audioManager.playAudio(sound);
            this.isGameOver = true;
            stopAllIntervals();
        }, 1000);
    }

    setImmortalTimer() {
        this.characterImmortal = true;
        setTimeout(() => this.characterImmortal = false, 150);
    }

    checkIfEndboss() {
        return this.level.enemies.some(enemy => enemy instanceof Endboss);
    }


    breakingGlassSound() {
        this.audioManager.playAudio('breaking_glass_sound');
    }


    deleteBottle(bottle) {
        setTimeout(() => this.throwableObject.splice(this.throwableObject.indexOf(bottle)), 200);
    }


    checkCollisionWithCollectible(collectibles, character, countPropertyName, statusBar, sound) {
        collectibles.forEach((collectible, index) => {
            if (this.isCharacterCollidingWithCollectable(collectible)) {
                this.collectItem(collectibles, index, character, countPropertyName, statusBar, sound);
            }
        });
    }


    isCharacterCollidingWithCollectable(collectible) {
        return this.character.isCollidingOld(collectible);
    }


    collectItem(collectibles, index, character, countPropertyName, statusBar, sound) {
        if (character[countPropertyName] < 100) {
            collectibles.splice(index, 1);
            character[countPropertyName] = character[countPropertyName] + this.oneItem;
            statusBar.setPercentage(character[countPropertyName]);
            if (sound) this.audioManager.playAudio(sound, 1);
        }
    }


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


    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) this.mirrowImage(mo);
        mo.draw(this.ctx);
        if (mo.otherDirection) this.mirrowImageReset(mo);
    }


    mirrowImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    mirrowImageReset(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}