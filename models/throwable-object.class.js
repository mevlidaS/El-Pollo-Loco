class ThrowableObject extends MovableObject {

isBreaking = false;
deletable = false;
isShooted = false;
offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };


IMAGES_ROTATE = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
];

IMAGES_BOTTLE_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
];

constructor(x, y,direction) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.loadImages(this.IMAGES_ROTATE);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.otherDirection = direction;
    this.trow();
    this.animateBottle();
}

trow() {

    this.speedY = 20;
    this.applyGravity();
    let moveInterval = setInterval(() => {
            this.x += 20;
            if (this.deletable) {
                clearInterval(moveInterval);
            }
    }, 50);
}

breakAndSplash() {
    this.isBreaking = true;
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    this.speedY = 0;
    this.speedX = 0;
    this.deletable = true;
}

animationFinished() {
    if (this.IMAGES_SPLASH && this.IMAGES_SPLASH.length > 0) {
        return this.currentImageIndex === this.IMAGES_SPLASH.length - 1;
    }
    return false;
}
animateBottle() {
    let animationInterval = setInterval(() => {
        if (!this.isBreaking) {
            this.playAnimation(this.IMAGES_ROTATE);
        } else {
            clearInterval(animationInterval);
        }
    }, 50);
}
}


