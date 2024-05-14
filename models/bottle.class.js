class Bottle extends MovableObject {
    height = 100;
    width = 100;
    collected = false;
    moveSpeed = 0.5;
    moveDirection = 1;
    moveDistance = 100;
    lastImageChange = 0;
    imageChangeInterval = 150;

    offset = {
        top: 90,
        bottom: 90,
        left: 30,
        right: 30,
      };
    

    IMAGES_SALSABOTTLE = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];

    IMAGES_SALSABOTTLE_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png'
    ];

    constructor(x,y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_SALSABOTTLE_GROUND);
        this.x = x;
        this.y = y;
        this.initialX = this.x;
        this.currentImageIndex = 0;
       setInterval(() => {
          this.playAnimation(this.IMAGES_SALSABOTTLE_GROUND);
       }, this.imageChangeInterval);
    }

    animate() {
        this.move();
        this.playAnimation(this.IMAGES_SALSABOTTLE_GROUND);
    }

    move() {
        
        this.x += this.moveSpeed * this.moveDirection;
        
        if (this.x > this.initialX + this.moveDistance || this.x < this.initialX - this.moveDistance) {
            this.moveDirection *= -1;
        }
    }
    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }
}








