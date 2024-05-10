class DrawableObject {
    x = 120;
    y = 100;
    img;
    height = 150;
    width = 100;
    imageCache={};
    currentImage = 0;
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
    

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if( this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Coin || this instanceof Bottle || this instanceof Endboss) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        // ctx.rect(this.x, this.y, this.width, this.height);
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
        ctx.stroke();
    }
}

    loadImages(arr){
        arr.forEach((path) => {
        let img= new Image();
        img.src = path;
        this.imageCache[path] = img;
        });
    }
}

