class World{

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        },100);
    };

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        };
    }

    checkCollisions() {
        // Überprüfen Sie Kollisionen zwischen dem Charakter und den Feinden
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    console.log('Collision with Characer, energy ', this.character.energy);
                    this.statusBar.setPercentage(this.character.energy);
            };
        });
    
            // Überprüfen Sie Kollisionen zwischen den Flaschen und den Feinden
            this.throwableObjects.forEach((bottle) => {
                this.level.enemies.forEach((enemy) => {
                    if (bottle.isColliding(enemy)) {
                        console.log('Flasche hat Chicken getroffen!');
                        // Fügen Sie hier weitere Aktionen hinzu, wenn die Flasche ein Chicken trifft
                    }
                });
            });
    }
    
    

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0)
        // Space for fixed Objects
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0)

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        

        this.ctx.translate(-this.camera_x, 0)

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    };

    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection){
            this.flipImageBack(mo)
        }
    };

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        mo.x = mo.x * -1;
        this.ctx.scale(-1, 1);
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
