class Coin extends MovableObject {

    IMAGES_COINS =[
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

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

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 1000/3);
    }
    
    collect() {
        this.collected = true;
    }
}