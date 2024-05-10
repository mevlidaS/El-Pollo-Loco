class StatusbarEndboss extends DrawableObject {
    percentage = 150;

    IMAGES_HEALTHBOSS = [
    'img/7_statusbars/2_statusbar_endboss/green/green0.png',
    'img/7_statusbars/2_statusbar_endboss/green/green20.png',
    'img/7_statusbars/2_statusbar_endboss/green/green40.png',
    'img/7_statusbars/2_statusbar_endboss/green/green60.png',
    'img/7_statusbars/2_statusbar_endboss/green/green80.png',
    'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTHBOSS);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(150);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTHBOSS[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(percentage) {
        if (percentage > 140) return 5;
        else if (percentage > 100) return 4;
        else if (percentage > 50) return 3;
        else if (percentage > 25) return 2;
        else if (percentage > 0) return 1;
        return 0;
    }
}
