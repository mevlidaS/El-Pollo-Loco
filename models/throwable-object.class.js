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

/**
 * Constructor for initializing a ThrowableObject at the specified coordinates with direction.
 *
 * @param {number} x - The x-coordinate of the ThrowableObject.
 * @param {number} y - The y-coordinate of the ThrowableObject.
 * @param {direction} direction - The direction of the ThrowableObject.
 * @return {void} No return value.
 */
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

/**
 * Function that initiates throwing behavior of the object, applying gravity and moving it based on direction.
 *
 * @param {void} No parameters.
 * @return {void} No return value.
 */
trow() {
    this.speedY = 20;
    this.applyGravity();
    let moveInterval = setInterval(() => {

        if (this.otherDirection  ) {
            this.x += -20;
            if (this.deletable) {
                clearInterval(moveInterval);
            }
        }

        if (!this.otherDirection) {
            this.x += +20;
            if (this.deletable) {
                clearInterval(moveInterval);
            }
        }
    }, 50);
}

/**
 * Initiates the breaking and splashing behavior of the throwable object.
 *
 * @param {void} No parameters.
 * @return {void} No return value.
 */
breakAndSplash() {
    this.isBreaking = true;
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    this.speedY = 0;
    this.speedX = 0;
    this.deletable = true;
}

/**
 * Checks if the animation of the object is finished based on the current image index and splash images.
 *
 * @return {boolean} Indicates whether the animation is finished.
 */
animationFinished() {
    if (this.IMAGES_SPLASH && this.IMAGES_SPLASH.length > 0) {
        return this.currentImageIndex === this.IMAGES_SPLASH.length - 1;
    }
    return false;
}

/**
 * Animates the Bottle object by playing the rotation animation until it breaks.
 *
 * @param {void} No parameters.
 * @return {void} No return value.
 */
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


