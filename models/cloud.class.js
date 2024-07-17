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

        // Randomize starting position
        this.x = Math.random() * 5000;

        // Start cloud animation
        this.animate();
    }

    /**
     * Start the cloud's animation.
     */
    animate() {
        // Move the cloud left continuously
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Move the cloud to the left based on its speed.
     */
    moveLeft() {
        // Move left by the current speed
        this.x -= this.speed;
    }
}
