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

    /**
     * Constructor for initializing the StatusbarEndboss with images, position, and a set percentage.
     *
     * @return {void} No return value.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTHBOSS);
        this.x = 500;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(150);
    }

    /**
     * Set the percentage value, update the path based on the percentage, and assign the corresponding image to display.
     *
     * @param {number} percentage - The percentage value to set.
     * @return {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTHBOSS[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image based on the percentage value.
     *
     * @param {number} percentage - The percentage value to calculate the index for.
     * @return {number} The index of the image to be displayed based on the percentage.
     */
    resolveImageIndex(percentage) {
        if (percentage > 140) return 5;
        else if (percentage > 100) return 4;
        else if (percentage > 50) return 3;
        else if (percentage > 25) return 2;
        else if (percentage > 0) return 1;
        return 0;
    }
}
