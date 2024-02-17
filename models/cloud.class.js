class Cloud extends MovableObject{
    height = 250;
    width = 400;
    y = 50

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/2.png')
    
        this.x = Math.random()*500;
        this.animate();
    }

    animate(){
        this.moveLeft();        
    }
    
    moveLeft(){
        setInterval( () => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}