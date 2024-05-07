class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
   

    constructor(x){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x =x;
        this.animate();
    }
    animate(){
       this.moveLeft();
    }
    moveLeft() {
        setInterval(() => {
            this.x -= 0.15;
            if (this.x < -this.width) {
                this.x = 720; 
            }
        }, 1000 / 60);
    }
}
