class DrawableObject {
    img;
    imgCache = {};
    x = 120;
    y = 185;
    height = 120;
    width = 100;
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof CollectableObject|| this instanceof ThrowableObject) {
            ctx.beginPath();
           //ctx.strokeStyle = 'blue';
           // ctx.rect(this.x, this.y, this.width, this.height);
           // ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }
    
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

}