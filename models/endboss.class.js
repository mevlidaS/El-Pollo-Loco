class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 50;
    isDead = false;
    offset = {
        top: 380,
        bottom: 340,
        left: 300,
        right: 300
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
 ]

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

    enterRoom() {
        this.isEntering = true;
        this.startContinuousMovement();
    }

    startContinuousMovement() {
        this.movementInterval = setInterval(() => {
            this.moveLeft();

        }, 2000 / 60);
    }

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


    playAnimation(images) {
        let index = Math.floor(this.currentImage % images.length);
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage += 0.5;
    }


    receiveHitByBottle() {
        this.energy -= this.damagePerHit;
        console.log(this.energy);
        if (this.energy <= 0) {
            this.isDead = true;
            this.playAnimation(this.IMAGES_DEAD);
        }
        if (this.energy >= 60){
            this.inDamageState = true;
            this.playAnimation(this.IMAGES_HURT);
            // playAudio(endbossHurtSound);

            setTimeout(() => {
                this.inDamageState = false;
                if (!this.isDead) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }, 20000 / 60 );
        }

        if (this.energy <= 60){
            this.inDamageState = true;
            this.aggressive = true;
            this.playAnimation(this.IMAGES_ATTACK);
            // playAudio(endbossHurtSound);

            setTimeout(() => {
                if (!this.isDead) {
                    this.inDamageState = false;
                    this.playAnimation(this.IMAGES_WALKING);
                    this.aggressive = false;
                }

            }, 60000 / 60 );

        }           

    }


    bossIsHurt() {
        this.inDamageState = true;
        this.playAnimation(this.IMAGES_HURT);
        // playAudio(endbossHurtSound);

        setTimeout(() => {
            this.inDamageState = false;
        }, 12000 / 60 );
    }

    animateEndboss() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        const animate = () => {
            this.animationFrameId = requestAnimationFrame(animate);
        };

        this.animationFrameId = requestAnimationFrame(animate);
    }

    stopActions() {
        clearInterval(this.movementInterval);
        cancelAnimationFrame(this.animationFrameId);
    }
}