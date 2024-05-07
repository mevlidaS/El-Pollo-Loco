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
    throwableObject = [];
    coins = new Coin();
    bottles = new Bottle();
    collectedCoins = 0;
    collectedBottles = 0;
    
   
    constructor(canavas, keyboard){
        this.ctx = canavas.getContext('2d');
        this.canvas = canavas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }
    
    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            this.checkCollisionsWithCoins();
            this.checkCollisionsWithBottles();
            this.checkCollisions();
            this.checkThrowObjects();
    }, 200)
    }

    checkThrowObjects(){
        if(this.keyboard.SPACE){
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle)

    }
}

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)){
                    this.character.hit();
                    this.statusBar.setProcentage(this.character.energy);
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
            }
        });
    }

    checkCollisionsWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.collectedBottles < 6) {
                this.collectedBottles++;
                this.statusBarBottles.collectBottle();
                this.level.bottles.splice(index, 1);
                this.statusBarBottles.setPercentage(this.statusBarBottles.bottleAmount);
                
            }
        });
    }


    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // back 
        // Space for fixed Objects
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
      
        this.ctx.translate(this.camera_x, 0);  // forwards

        this.addToMap(this.character);  
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);
       

        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function(){
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


