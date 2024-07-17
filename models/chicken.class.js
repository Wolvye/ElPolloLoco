/**
 * Class representing a chicken enemy.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /**
     * The height of the chicken.
     * @type {number}
     */
    height = 50;

    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 50;

    /**
     * Interval ID for the main animation loop.
     * @type {number}
     */
    animateIntervallID;

    /**
     * Interval ID for the secondary animation loop.
     * @type {number}
     */
    animateIntervallID2;

    /**
     * Audio object for chicken sound.
     * @type {Audio}
     */
    chicken_sound = new Audio('audio/chicken.mp3');

    /**
     * Offset values for collision detection.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Array of image paths for walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /**
     * Array of image paths for dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD_CHICKI = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Create a chicken object.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        // Randomize starting position
        this.x = 200 + Math.random() * 3000;
        this.y = 430 - this.height;
        this.animate();
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_DEAD_CHICKI);
    }

    /**
     * Start the chicken's animations.
     */
    animate() {
        this.chicken_sound.volume = 0.01;
        this.animateIntervallID = setInterval(() => {
            this.moveLeft();
            if (soundMute) {
                this.chicken_sound.muted = true;
            } else {
                this.chicken_sound.muted = false;
                this.chicken_sound.play();
            }
        }, 1000 / 60);
        this.animateIntervallID2 = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}
