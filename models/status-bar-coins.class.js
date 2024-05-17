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

    /**
     * Constructor for initializing the StatusBarCoins with images, position, and initial percentage set to 0.
     *
     * @return {void} No return value.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 10;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Updates the coin amount, calculates the percentage, determines the image index based on the percentage,
     * sets the path to the corresponding image, and updates the displayed image.
     *
     * @param {number} coinAmount - The amount of coins to set.
     * @return {void} No return value.
     */
    setPercentage(coinAmount) { 
        this.coinAmount = coinAmount;
        let percentage = Math.floor((this.coinAmount / 100) * 100); 
        let imageIndex = Math.min(Math.floor(percentage / 20), this.IMAGES_COINS.length - 1);
        let path = this.IMAGES_COINS[imageIndex];
        this.img = this.imageCache[path];
    }

    /**
     * Update the coin amount by adding 20, ensure it does not exceed 100, and set the percentage based on the updated amount.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    collectCoin() {
        this.coinAmount += 20;
        if (this.coinAmount > 100) {
            this.coinAmount = 100;
        }
        this.setPercentage(this.coinAmount);
    }

    /**
     * Determines the index of the image based on the current percentage value.
     *
     * @return {number} The index of the image to be displayed.
     */
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
