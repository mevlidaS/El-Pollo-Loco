class Bottle extends MovableObject {
    height = 100;
    width = 100;
    collected = false;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];

    IMAGES_BOTTLE_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png'
    ];

    constructor(x,y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = y;
       setInterval(() => {
          this.playAnimation(this.IMAGES_BOTTLE);
       })
    }

    animate() {
        this.move();
        this.playAnimation(this.IMAGES_BOTTLE_GROUND);
    }
}




