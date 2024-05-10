class MovableObject extends DrawableObject {
   
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    offset; 

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject){
            return true;
        } else{
            return this.y < 180;
        }
    }
    

    isColliding (mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
          );
        }

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


isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
}

isDead() {
    return this.energy == 0;
}
// arr- array
   
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
         //Walk animation
         let i = this.currentImage % images.length;
         let path = images[i];
         this.img = this.imageCache[path];
         this.currentImage++; 
    }
}
