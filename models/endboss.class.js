class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 50;
    isDead = false;
    offset = {
        top: 70,
        bottom: 10,
        left: 60,
        right: 30,
    }
    firstContact = false;
    endbossAlerted = false;
    inDamageState = false;
    hitCount = 0;
    aggressive = false;

    aggressiveMoveSpeed = 3;
    isHitByBottle = false;
    jumpInterval = null;
    isJumping = false;

    maxEnergy = 25;
    damagePerHit = 20;
    energy = 150;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Constructor for initializing the Endboss with various images and properties.
     *
     * @return {void} No return value.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.x = 3500;
        this.energy = 150;
        this.speed = 2;
        this.animateEndboss();
        this.animate();
        this.groundLevel = 40;
    }

    /**
     * Sets the flag to indicate entering and starts continuous movement.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    enterRoom() {
        this.isEntering = true;
        this.startContinuousMovement();
    }

    /**
     * Starts continuous movement at a set interval.
     */
    startContinuousMovement() {
        this.movementInterval = setInterval(() => {
            this.moveLeft();
        }, 2000 / 60);
    }

    /**
     * Initiates a jump action for the end boss if not currently jumping.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.speedY = 20;

            const moveUp = () => {
                if (this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= 2;
                    requestAnimationFrame(moveUp);
                } else {
                    this.fall();
                }
            };
            moveUp();
        }
    }

    /**
     * Updates the falling behavior of the end boss.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    fall() {
        if (this.y < this.groundLevel) {
            this.speedY += 0.5;
            this.y += this.speedY;
            requestAnimationFrame(() => this.fall());
        } else {
            this.isJumping = false;
            this.y = this.groundLevel;
            this.speedY = 0;
        }
    }

    /**
     * Animates the end boss based on its state (dead, aggressive, in damage state, or walking) by playing corresponding animations at a regular interval.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    animate() {
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);

            } else if (this.aggressive) {
                this.playAnimation(this.IMAGES_ATTACK);

            } else if (this.inDamageState) {
                this.playAnimation(this.IMAGES_HURT);

            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 9000 / 60);
    }

    /**
     * Plays the animation for the object using the provided images.
     *
     * @param {array} images - The array of image paths for the animation.
     * @return {void} No return value.
     */
    playAnimation(images) {
        let index = Math.floor(this.currentImage % images.length);
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage += 0.5;
    }

    /**
     * Executes a series of actions when the object receives a hit by a bottle.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    receiveHitByBottle() {
        this.reduceEnergy();
        this.checkIfDead();
        this.updateDamageState();
        this.updateAggressiveState();
    }

    /**
     * Reduces the energy of the object by the damage per hit amount.
     *
     * @param {} No parameters.
     * @return {} No return value.
     */
    reduceEnergy() {
        this.energy -= this.damagePerHit;
    }

    /**
     * Checks if the object is dead based on its energy level and triggers corresponding actions.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    checkIfDead() {
        if (this.energy <= 0) {
            this.isDead = true;
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

    /**
     * Updates the damage state of the object based on its energy level.
     *
     * @param {} No parameters.
     * @return {} No return value.
     */
    updateDamageState() {
        if (this.energy >= 60) {
            this.enterDamageState(this.IMAGES_HURT, 20000);
        }
    }

    /**
     * Updates the aggressive state based on the energy level and triggers an attack animation if energy is low.
     *
     * @param {} No parameters.
     * @return {} No return value.
     */
    updateAggressiveState() {
        if (this.energy <= 60) {
            this.aggressive = true;
            this.enterDamageState(this.IMAGES_ATTACK, 60000);
        }
    }

    /**
     * Enters the end boss into a damage state, plays the provided animation images, triggers a hurt sound,
     * and transitions out of the damage state after a specified duration if the end boss is not dead.
     *
     * @param {array} animationImages - The array of image paths for the damage animation.
     * @param {number} duration - The duration of the damage state in milliseconds.
     * @return {void} No return value.
     */
    enterDamageState(animationImages, duration) {
        this.inDamageState = true;
        this.playAnimation(animationImages);
        playAudio(endbossHurtSound);
        setTimeout(() => {
            if (!this.isDead) {
                this.inDamageState = false;
                this.playAnimation(this.IMAGES_WALKING);
                this.aggressive = false;
            }
        }, duration / 60);
    }

    /**
     * Sets the Endboss in a hurt state, plays the hurt animation, and triggers a hurt sound.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    bossIsHurt() {
        this.inDamageState = true;
        this.playAnimation(this.IMAGES_HURT);
        playAudio(endbossHurtSound);
        setTimeout(() => {
            this.inDamageState = false;
        }, 12000 / 60 );
    }

    /**
     * Animates the end boss by running the animation loop using requestAnimationFrame.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    animateEndboss() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        const animate = () => {
            this.animationFrameId = requestAnimationFrame(animate);
        };
        this.animationFrameId = requestAnimationFrame(animate);
    }

    /**
     * Stops the actions of the Endboss by clearing the movement interval and canceling the animation frame.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    stopActions() {
        clearInterval(this.movementInterval);
        cancelAnimationFrame(this.animationFrameId);
    }
}