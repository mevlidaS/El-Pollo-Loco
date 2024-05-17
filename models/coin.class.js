class Coin extends MovableObject {

    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      };
    
    IMAGES_COINS =[
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Constructor for initializing a Coin object at the specified coordinates with a given height and width.
     *
     * @param {number} x - The x-coordinate of the Coin.
     * @param {number} y - The y-coordinate of the Coin.
     * @param {number} height - The height of the Coin.
     * @param {number} width - The width of the Coin.
     * @return {void} No return value.
     */
    constructor(x,y,height,width) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.speed = 0.10 + Math.random() *0.25;
        this.animateCoins();
    }

    /**
     * Animates the coins by playing the coin animation at regular intervals.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 1000/3);
    }
    
    /**
     * Marks the coin as collected.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    collect() {
        this.collected = true;
    }
}