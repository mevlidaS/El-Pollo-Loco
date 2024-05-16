let level1; 
 
 /**
  * Initializes the level with chickens, endboss, clouds, coins, bottles, and background objects.
  *
  * @return {void} No return value
  */
function initLevel() {
 
 level1= new Level(
        [
            new Chicken(600),
            new Chicken(1500),
            new Chicken(1900),
            new Chicken(2800),
            new SmallChicken(400),
            new SmallChicken(900),
            new SmallChicken(2100),
            new SmallChicken(2700),
        ],

        [
            new Endboss(),
        ],

        [
            new Cloud(500),
            new Cloud(1200),
            new Cloud(2000),
        ],

        [
            new Coin(700, 250, 150, 150),
            new Coin(1000, 200, 150, 150),
            new Coin(1200, 280, 150, 150),
            new Coin(1400, 300, 150, 150),
            new Coin(1800, 300, 150, 150),
            new Coin(2000, 200, 150, 150),
        ],

        [
            new Bottle(300,200),
            new Bottle(600,150),
            new Bottle(800,250),
            new Bottle(900,300),
            new Bottle(1200,200),
            new Bottle(1400,250),
            new Bottle(1500,150),
            new Bottle(2200,300),
            new Bottle(2400,250),
            new Bottle(2500,200),
            new Bottle(2800,300),
        ],

        [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png' , -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png' , -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png' , -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png' , 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png' , 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png' , 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png' , 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png' , 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png' , 719),
        
        new BackgroundObject('img/5_background/layers/air.png', 719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png' , 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png' , 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png' , 719*2),

        new BackgroundObject('img/5_background/layers/air.png', 719 *3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png' , 719 *3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png' , 719 *3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png' , 719 *3),

        new BackgroundObject('img/5_background/layers/air.png', 719*4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png' , 719*4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png' , 719*4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png' , 719*4),

        new BackgroundObject('img/5_background/layers/air.png', 719 *5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png' , 719 *5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png' , 719 *5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png' , 719 *5),
    ]
);

}