class StatusBarBottles extends DrawableObject {

IMAGES_BOTTLES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
];

percentage = 100;
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

setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_BOTTLES[this.resolveImageIndex(percentage)];
    this.img = this.imageCache[path];
}

collectBottle() {
    this.bottleAmount += 20;
    if (this.bottleAmount > 100) {
        this.bottleAmount = 100;
    }
    this.setPercentage(this.bottleAmount); // Update status bar when collecting bottles
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
    return Math.min(Math.floor(this.percentage / 20), this.IMAGES_BOTTLES.length - 1);
}

}