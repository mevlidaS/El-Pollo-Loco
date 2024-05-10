class StatusBarCoins extends DrawableObject {
    
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',

    ];

    percentage = 100;
    coinAmount = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 10;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(coinAmount) { 
        this.coinAmount = coinAmount;
        let percentage = Math.floor((this.coinAmount / 100) * 100); 
        let imageIndex = Math.min(Math.floor(percentage / 20), this.IMAGES_COINS.length - 1);
        let path = this.IMAGES_COINS[imageIndex];
        this.img = this.imageCache[path];
    }

    collectCoin() {
        this.coinAmount += 20;
        if (this.coinAmount > 100) {
            this.coinAmount = 100;
        }
        this.setPercentage(this.coinAmount);
    }

    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage == 20) {
            return 1;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 100) {
            return 5;
        }
        return Math.min(Math.floor(this.percentage / 20), this.IMAGES_COINS.length - 1);
    }
    
}
