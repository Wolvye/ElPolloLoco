/**
 * Class representing a background object.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * Create a background object.
     * @param {string} imagePath - The path to the image.
     * @param {number} x - The x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        // Call the loadImage method from the parent class MovableObject
        super().loadImage(imagePath);

        /**
         * The x-coordinate of the background object.
         * @type {number}
         */
        this.x = x;

        /**
         * The y-coordinate of the background object, calculated based on the height.
         * @type {number}
         */
        this.y = 480 - this.height;
    }
};
