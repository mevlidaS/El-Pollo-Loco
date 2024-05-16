class StatusBarBottles extends DrawableObject {

IMAGES_BOTTLES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
];

percentage = 0;
bottleAmount = 0;

constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = 10;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
}

/**
 * Set the percentage value, calculate the path based on the percentage, and update the image accordingly.
 *
 * @param {number} percentage - The percentage value to set.
 * @return {void} 
 */
setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_BOTTLES[this.resolveImageIndex(percentage)];
    this.img = this.imageCache[path];
}

/**
 * Update the bottle amount by adding 20, ensure it does not exceed 100, and set the percentage based on the updated amount.
 *
 * @return {void} Update status bar when collecting bottles
 */
collectBottle() {
    this.bottleAmount += 20;
    if (this.bottleAmount > 100) {
        this.bottleAmount = 100;
    }
    this.setPercentage(this.bottleAmount);
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
        return Math.min(Math.floor(this.percentage / 20), this.IMAGES_BOTTLES.length - 1);
    }

}