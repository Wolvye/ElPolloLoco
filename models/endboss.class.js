/**
 * Class representing an end boss object.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    /**
     * Height of the end boss.
     * @type {number}
     */
    height = 350;

    /**
     * Width of the end boss.
     * @type {number}
     */
    width = 350;

    /**
     * Initial y-coordinate of the end boss.
     * @type {number}
     */
    y = 100;

    /**
     * Offset for collision detection.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 50,
        left: 20,
        right: 20,
        bottom: 20
    };

    /**
     * Interval ID for boss animation.
     * @type {number}
     */
    animateIntervallIDBoss;

    /**
     * Interval ID for secondary boss animation.
     * @type {number}
     */
    animateIntervallIDBoss2;

    /**
     * Array of image paths for walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    /**
     * Array of image paths for hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT_BOSS = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Array of image paths for dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD_BOSS = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Array of image paths for additional boss animation.
     * @type {string[]}
     */
    IMAGES_ANIMATE_ENDBOSS = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    /**
     * Flag indicating if the boss had first contact.
     * @type {boolean}
     */
    hadFirstContact = false;

    /**
     * Audio object for win sound.
     * @type {HTMLAudioElement}
     */
    win_sound = new Audio('audio/win.mp3');

    /**
     * Creates an end boss object.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD_BOSS);
        this.loadImages(this.IMAGES_HURT_BOSS);
        this.x = 2300;
        this.animate();
    }

    /**
     * Ends the game after a delay.
     */
    endGame() {
        setTimeout(() => {
            this.height = 480;
            this.width = 720;
            this.x = world.character.x - 100;
            this.y = 0;
            this.loadImage('img/9_intro_outro_screens/win/win_2.png');
            clearAllIntervals();
        }, 2000);
    }

    /**
     * Initiates boss animations.
     */
    animate() {
        this.win_sound.volume = 0.1;
        let move = false;
        let i = 0;

        // Interval for initiating animation after a certain condition
        setInterval(() => {
            i++;
            if (this.x > 2000 && !this.hadFirstContact) {
                this.playAnimation(this.IMAGES_ANIMATE_ENDBOSS);
                i = 0;
                this.hadFirstContact = true;
            }
        }, 1500);

        // Interval for main walking animation
        this.animateIntervallIDBoss = setInterval(() => {
            if (this.energy > 0) {
                move = true;
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.energy <= 0) {
                this.playAnimationOnce(this.IMAGES_DEAD_BOSS);
                clearInterval(this.animateIntervallIDBoss);
                move = false;
                if (soundMute) {
                    this.win_sound.muted = true;
                } else {
                    this.win_sound.muted = false;
                    this.win_sound.play();
                }
                this.endGame();
            }
        }, 300);

        // Interval for continuous movement
        setInterval(() => {
            if (move) {
                this.moveLeft();
            }
        }, 1000 / 240);
    }

    /**
     * Moves the boss object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }
}
