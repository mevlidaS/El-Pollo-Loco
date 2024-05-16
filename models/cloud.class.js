class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
   

    /**
     * Constructor for creating a Cloud object at the specified x-coordinate.
     *
     * @param {number} x - The x-coordinate of the Cloud.
     * @return {void} No return value.
     */
    constructor(x){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x =x;
        this.animate();
    }
    animate(){
       this.moveLeft();
    }
    
    /**
     * Moves the object to the left at a constant speed and resets its position when it goes off-screen.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    moveLeft() {
        setInterval(() => {
            this.x -= 0.15;
            if (this.x < -this.width) {
                this.x = 720; 
            }
        }, 1000 / 60);
    }
}
