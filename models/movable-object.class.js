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

    /**
     * Checks if the object is dead based on its energy level.
     *
     * @return {boolean} Indicates whether the object is dead.
     */
    isDead() {
        return this.energy == 0;
    }
   
    /**
     * Moves the object to the right based on its speed.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    moveRight(){
        this.x += this.speed;
    }
    
    /**
     * Moves the object to the left based on its speed.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    moveLeft(){
        this.x -= this.speed;
    }

    /**
     * Sets the vertical speed and updates the idle time of the object.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    jump(){
        this.speedY = 25;
        this.idleTime = new Date().getTime();
    }

    /**
     * Plays the animation for the object using the provided images.
     *
     * @param {array} images - The array of image paths for the animation.
     * @return {void} No return value
     */
    playAnimation(images) {
         let i = this.currentImage % images.length;
         let path = images[i];
         this.img = this.imageCache[path];
         this.currentImage++; 
    }
}
