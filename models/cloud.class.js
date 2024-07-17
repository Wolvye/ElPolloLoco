/**
 * Class representing a cloud object.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /**
     * The initial y-coordinate of the cloud.
     * @type {number}
     */
    y = 20;

    /**
     * The height of the cloud.
     * @type {number}
     */
    height = 250;

    /**
     * The width of the cloud.
     * @type {number}
     */
    width = 300;

    /**
     * Create a cloud object.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 5000;
        this.animate();
    }

    /**
     * Start the cloud's animation.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Move the cloud to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }
}
