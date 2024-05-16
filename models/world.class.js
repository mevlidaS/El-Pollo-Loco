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
    
   
    /**
     * Constructor for initializing the game world with the canvas, keyboard, and callbacks.
     *
     * @param {Object} canavas - The canvas element for rendering.
     * @param {Object} keyboard - The keyboard input handler.
     * @param {function} endGameCallback - The callback function for ending the game.
     * @param {function} winGameCallback - The callback function for winning the game.
     */
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

    /**
     * Executes multiple checks at different intervals within the game loop.
     *
     * @param None
     * @return None
     */
    run() {
        setInterval(() => {
            this.checkCollisionsWithCoins();
            this.checkCollisionsWithBottles();
            this.checkThrowableObjects();
            this.checkCollisions();
        }, 100);

        setInterval(() => {
            this.throwableObjectAttack();
            this.checkJumpOnEnemies();
            this.checkCollisionswitdhEndboss();
            this.checkEndbossDeath();
            this.checkCollisionsWithGround();
            this.checkEndbossArea();
        }, 40);
    }
    /**
     * Sets the game to end and stops the actions of the endboss.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    endGameActions() {
        this.isGameOver = true;
        this.endboss.stopActions();
    }

    /**
     * Checks if the character is in the endboss area and triggers the entry.
     *
     * @param None
     * @return None
     */
    checkEndbossArea() {
        if (this.character.x >= 3100 && !this.level.endboss[0].isEntering) {
            this.enterEndbossArea();
        }
    }

    /**
     * Enters the endboss area by pausing background music, playing endboss music, and triggering the endboss room entry if available.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    enterEndbossArea() {
        if (backgroundMusic) {
            backgroundMusic.pause();
        }
        playAudio(endbossMusic);

        if (this.level.endboss[0]) {
            this.level.endboss[0].enterRoom();
        }
    }

    /**
     * Checks collisions with the endboss and handles character actions accordingly.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    checkCollisionswitdhEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.lastJump = false;
                this.character.hit(this.lastJump);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks for interactions between the character and enemies during jumping actions.
     *
     * @param None
     * @return None
     */
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

    /**
     * Sets the enemy to be dead and removes it from the list after a delay.
     *
     * @param {Enemy} enemy - The enemy to be killed.
     * @param {number} index - The index of the enemy in the list.
     * @return {void} No return value.
     */
    killChicken(enemy, index) {
        enemy.isDead = true;

        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 600);
    }

    /**
     * Checks collisions between the character and enemies and updates character status.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)){
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
            }
        });  
    }

    /**
     * Checks collisions with coins and updates collected coins and status bar accordingly.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
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
            if (this.character.isColliding(bottle) && this.collectedBottles < 5) {
                this.collectedBottles++;
                this.statusBarBottles.collectBottle();
                this.level.bottles.splice(index, 1);
                this.statusBarBottles.setPercentage(this.statusBarBottles.bottleAmount);
                playAudio(bottleCollectSound);
                
            }
        });
    }

    /**
     * Checks if the space key is pressed and there are collected bottles to throw a throwable object.
     *
     * @param None
     * @return None
     */
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

    /**
     * Checks for collisions of throwable objects with the ground.
     *
     * @param None
     * @return None
     */
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

    /**
     * Iterates through throwable objects, checks collisions with enemies and endboss,
     * and performs corresponding actions if collisions occur.
     *
     * @param None
     * @return None
     */
    throwableObjectAttack() {
        this.throwableObjects.forEach((throwableObject, index) => {
            this.level.enemies.forEach((enemy,index) => {
                if (throwableObject.isColliding(enemy)) {
                    this.isDead = true;
                    this.killChicken(enemy);

                    this.throwableObjects.splice(index, 1);
                }
            });

            if (this.level.endboss) {
                this.level.endboss.forEach((endboss) => {
                    if (throwableObject.isColliding(endboss,index)) {
                        this.damageEndboss(endboss);
                        this.throwableObjects.splice(index, 1);
                    }
                });
            }
        });
    }

    
    /**
     * Damages the endboss by making it receive a hit by a bottle and updates the endboss's energy level.
     *
     * @param {Object} endboss - The endboss object to damage.
     * @return {void} No return value.
     */
    damageEndboss(endboss) {
        endboss.receiveHitByBottle();
        this.statusBarEndboss.setPercentage(endboss.energy);

        if (endboss.isDead) {
            endboss.playAnimation(endboss.IMAGES_DEAD);
            playAudio(winSound);
            this.winGameCallback();
        }
    }

    /**
     * Checks if the end boss is dead and triggers the win game callback if so.
     *
     * @param None
     * @return None
     */
    checkEndbossDeath() {
        if (this.level.endboss[0] && this.level.endboss[0].isDead) {
            this.winGameCallback();
        }
    }

    /**
     * Draws the game elements on the canvas including background, objects, enemies, and status bars.
     *
     * @param None
     * @return None
     */
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


