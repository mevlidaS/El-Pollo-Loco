class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    offset; 

    /**
     * Applies gravity to the object by updating its vertical position based on speed and acceleration.
     *
     */
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/25);
    }

    /**
     * Checks if the object is above the ground level.
     *
     * @return {boolean} Indicates whether the object is above the ground level.
     */
    isAboveGround() {
        if(this instanceof ThrowableObject){
            return true;
        } else{
            return this.y < 180;
        }
    }
    
    /**
     * Checks if this object is colliding with another object.
     *
     * @param {MovableObject} mo - The other movable object to check collision with
     * @return {boolean} Returns true if colliding, false if not
     */
    isColliding (mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
          );
        }

    /**
     * Handles the logic for when the object is hit.
     *
     * @param {boolean} lastJump - Indicates if it was the last jump
     */
    hit(lastJump) {
        if (lastJump == false) {
            let currentTime = new Date().getTime();  
            if (currentTime - this.lastHit > 1000) {
                this.energy -= 25;
                if (this.energy <= 0 && !this.isDead) {
                    this.character.checkIfDead();
                }
                this.lastHit = currentTime;
            }
        }
    }

    /**
     * Calculates if the object has been hurt recently.
     *
     * @return {boolean} Indicates whether the object is hurt.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }
   
    moveRight(){
        this.x += this.speed;
    }
    moveLeft(){
        this.x -= this.speed;
    }

    jump(){
        this.speedY = 25;
        this.idleTime = new Date().getTime();
    }

    playAnimation(images) {
         let i = this.currentImage % images.length;
         let path = images[i];
         this.img = this.imageCache[path];
         this.currentImage++; 
    }
}
