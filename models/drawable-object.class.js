class DrawableObject {
    x = 120;
    y = 100;
    img;
    height = 150;
    width = 100;
    imageCache={};
    currentImage = 0;
    
    /**
     * Loads an image from the specified path into the img property.
     *
     * @param {string} path - The path to the image to load.
     * @return {void} No return value
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads images into the imageCache based on the paths provided in the array.
     *
     * @param {array} arr - An array of image paths to load.
     * @return {void} No return value
     */
    loadImages(arr){
        arr.forEach((path) => {
        let img= new Image();
        img.src = path;
        this.imageCache[path] = img;
        });
    }
    
    /**
     * Draws the image on the canvas at the specified coordinates.
     *
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas
     * @return {void} No return value
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a frame around the object based on its type.
     *
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas
     * @return {void} No return value
     */
    drawFrame(ctx) {
        if( this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Coin || this instanceof Bottle || this instanceof Endboss) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.stroke();
        }
    }
}

