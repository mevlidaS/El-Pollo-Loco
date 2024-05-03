class MovableObject extends DrawableObject {
   
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/25);
    }

    isAboveGround() {
       return this.y < 100;
    }
    

    drawFrame(ctx) {
        if( this instanceof Character || this instanceof Chicken) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}

isColliding (mo) {
    return  this.x + this.width >= mo.x && 
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

hit() {
    this.energy -= 5;
    if(this.energy < 0) {
        this.energy = 0;
    } else{
        this.lastHit = new Date().getTime();
    }
}

isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
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
    }

    playAnimation(images) {
         //Walk animation
         let i = this.currentImage % images.length;
         let path = images[i];
         this.img = this.imageCache[path];
         this.currentImage++; 
    }
}
