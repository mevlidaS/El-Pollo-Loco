class World{
    character = new Character();
    level = level1;
    canavas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    statusBarEndboss = new StatusbarEndboss();
    throwableObjects = [];
    collectedCoins = 0;
    collectedBottles = 0;
    lastJump = false;
    lastJumpTime;
    endBossHurt = false;
    isShooted = false;
    END_BOSS_AREA_X = 2500;
    splashHeight = 370;
    isGameOver = false;
    // collectBottleSound= new Audio('audio/bottle_collected.wav');
    // collectCoinSound = new Audio('audio/coins_collected.wav');
    // endbossSound = new Audio ('audio/endboss_kommt.mp3');
    // winSound = new Audio ('audio/gewonnen.mp3');
    
   
    constructor(canavas, keyboard, endGameCallback, winGameCallback) {
        this.ctx = canavas.getContext('2d');
        this.canvas = canavas;
        this.keyboard = keyboard;
        this.statusBarEndboss = new StatusbarEndboss();
        this.draw();
        this.setWorld();
        this.run();
        this.endGameCallback = endGameCallback;
        this.winGameCallback = winGameCallback;
        this.endboss = new Endboss();
       
    }
    
    setWorld(){
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisionsWithCoins();
            this.checkCollisionsWithBottles();
            this.checkThrowableObjects();
            this.checkCollisions();
        }, 100);

        setInterval(() => {
            this.ThrowableObjectAttack();
            this.checkJumpOnEnemies();
            this.checkCollisionswitdhEndboss();
            this.checkEndbossDeath();
            this.checkCollisionsWithGround();
            this.checkEndbossArea();
        }, 40);
    }
    endGameActions() {
        this.isGameOver = true;
        this.endboss.stopActions();
    }

    checkEndbossArea() {
        if (this.character.x >= 3100 && !this.level.endboss[0].isEntering) {
            this.enterEndbossArea();
        }
    }

    enterEndbossArea() {
        if (backgroundMusic) {
            backgroundMusic.pause();
        }
        playAudio(endbossMusic);

        if (this.level.endboss[0]) {
            this.level.endboss[0].enterRoom();
        }
    }

    checkCollisionswitdhEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.lastJump = false;
                this.character.hit(this.lastJump);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkJumpOnEnemies() {
        if (this.character.y < 110) {
            this.lastJumpTime = true;
        }

        if (this.character.y >= 180) {
            this.lastJumpTime = false;
        }


        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) {

                    if (this.lastJumpTime == true) {
                        this.killChicken(enemy, index);
                        this.lastJumpTime = false;
                        this.lastJump = true;
                    }
                }

                else {
                    this.character.hit(this.lastJump);
                    this.statusBar.setPercentage(this.character.energy);
                }

                setTimeout(() => {
                    this.lastJump = false;
                }, 700);
            }
        });
    }

    killChicken(enemy, index) {
        enemy.isDead = true;

        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 600);
    }


    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)){
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
            }
        });  
    }

    checkCollisionsWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin) && this.collectedCoins < 6) {
                this.collectedCoins++;
                this.statusBarCoins.collectCoin();
                this.level.coins.splice(index, 1);
                this.statusBarCoins.setPercentage(this.statusBarCoins.coinAmount);
               playAudio(coinCollectSound);
            }
        });
    }

    checkCollisionsWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.collectedBottles < 10) {
                this.collectedBottles++;
                this.statusBarBottles.collectBottle();
                this.level.bottles.splice(index, 1);
                this.statusBarBottles.setPercentage(this.statusBarBottles.bottleAmount);
                playAudio(bottleCollectSound);
                
            }
        });
    }

    checkThrowableObjects() {
        if (this.keyboard.SPACE && this.collectedBottles > 0) {
            if (this.isShooted == false) {
                this.isShooted = true;
                setTimeout(() => {
                    this.isShooted = false;
                }, 2000);

                let throwableObject = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
                this.throwableObjects.push(throwableObject);
                this.lastThrown = Date.now();
                this.collectedBottles--;
                this.statusBarBottles.setPercentage(this.collectedBottles * 20);
            }
        }
    }


    checkCollisionsWithGround() {
        this.throwableObjects.forEach((throwableObjects, index) => {
            if (throwableObjects.y > this.splashHeight && !throwableObjects.isBreaking) {
                throwableObjects.breakAndSplash();

            }
            if (throwableObjects.animationFinished()) {
                this.throwableObjects.splice(index, 1);
            }
        });
    }

    ThrowableObjectAttack() {
        this.throwableObjects.forEach((throwableObject, index) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (throwableObject.isColliding(enemy)) {
                    this.isDead = true;
                    this.killChicken(enemy);

                    this.throwableObjects.splice(index, 1);
                }
            });

            if (this.level.endboss) {
                this.level.endboss.forEach((endboss, endbossIndex) => {
                    if (throwableObject.isColliding(endboss)) {
                        this.damageEndboss(endboss);
                        this.throwableObjects.splice(index, 1);
                    }
                });
            }
        });
    }


    
    damageEndboss(endboss) {
        endboss.receiveHitByBottle();
        this.statusBarEndboss.setPercentage(endboss.energy);

        if (endboss.isDead) {
            endboss.playAnimation(endboss.IMAGES_DEAD);
            playAudio(winSound);
            this.winGameCallback();
        }
    }

    checkEndbossDeath() {
        if (this.level.endboss[0] && this.level.endboss[0].isDead) {
            this.winGameCallback();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);

        if (this.level.endboss[0] && (this.level.endboss[0].isEntering || this.level.endboss[0].x < 3200)) {
            this.addToMap(this.level.endboss[0]);
        }

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach((o) => {
            this.addToMap(o);
        })
    }
    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
       mo.draw(this.ctx);
       mo.drawFrame(this.ctx);
        
        
        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    
}


