/**
 * Base class representing a drawable object.
 */
class DrawableObject {
    /**
     * Image object representing the drawable image.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Cache for loaded images.
     * @type {Object.<string, HTMLImageElement>}
     */
    imgCache = {};

    /**
     * X-coordinate of the drawable object.
     * @type {number}
     */
    x = 120;

    /**
     * Y-coordinate of the drawable object.
     * @type {number}
     */
    y = 185;

    /**
     * Height of the drawable object.
     * @type {number}
     */
    height = 120;

    /**
     * Width of the drawable object.
     * @type {number}
     */
    width = 100;

    /**
     * Index of the current image to display.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Load an image from a given path.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draw the object onto a canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draw a frame (bounding box) around the object.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    drawFrame(ctx) {
        // Draw frame only for specific subclasses|| For checking Hitbox 72-74
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof CollectableObject || this instanceof ThrowableObject) {
            ctx.beginPath();
            // ctx.strokeStyle = 'blue';
            // ctx.rect(this.x, this.y, this.width, this.height);
            // ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    /**
     * Preload images into the cache.
     * @param {string[]} arr - Array of image paths to preload.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }
}
