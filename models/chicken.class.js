class Chicken extends MovableObject{
    y = 360;
    width = 80;
    height = 70;
    isDead = false;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    
    /**
     * Constructor for initializing a Chicken object at the specified x-coordinate.
     *
     * @param {number} x - The x-coordinate of the Chicken.
     * @return {void} No return value.
     */
    constructor(x){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Animates the object based on its state of being alive or dead, moving left, and playing animations accordingly.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 400);
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}