/**
 * Class representing a character object.
 * @extends MovableObject
 */
class Character extends MovableObject {
    /**
     * The height of the character.
     * @type {number}
     */
    height = 250;

    /**
     * The width of the character.
     * @type {number}
     */
    width = 150;

    /**
     * The movement speed of the character.
     * @type {number}
     */
    speed = 5;

    /**
     * The initial y-coordinate of the character.
     * @type {number}
     */
    y = 80;

    /**
     * Offset values for collision detection.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 100,
        left: 40,
        right: 40,
        bottom: 10
    };

    /**
     * Audio object for game over sound.
     * @type {Audio}
     */
    gameOver_Sound = new Audio('audio/gameOver.mp3');

    /**
     * Array of image paths for walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    /**
     * Array of image paths for jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    /**
     * Array of image paths for dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    /**
     * Array of image paths for hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    /**
     * Array of image paths for idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    /**
     * Array of image paths for sleep animation.
     * @type {string[]}
     */
    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /**
     * Reference to the world object.
     * @type {World}
     */
    world;

    /**
     * Audio object for walking sound.
     * @type {Audio}
     */
    walking_sound = new Audio('audio/run.mp3');

    /**
     * Audio object for jump sound.
     * @type {Audio}
     */
    jump_sound = new Audio('audio/jump.mp3');

    /**
     * The character's energy level.
     * @type {number}
     */
    energy = 1500;

    /**
    * The character's energy level.
    * @type {Date}
     */
    currentTime = null;
    /**
     * Create a character object.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.animate();
        this.apllyGravity();
        this.walkSound();
        this.handlerMove();
        this.handlerAnimation();
        this.smallHandlerAnimation();
        
    }

    /**
     * Play walking sound.
     */
    walkSound() {
        if (soundMute) {
            this.walking_sound.muted = true;
        } else {
            this.walking_sound.muted = false;
            this.walking_sound.play();
        }
    }

    /**
     * Play jump sound.
     */
    jumpSound() {
        if (soundMute) {
            this.jump_sound.muted = true;
        } else {
            this.jump_sound.muted = false;
            this.jump_sound.play();
        }
    }

    /**
     * Start the animation loops.
     */
    animate() {
        this.handlerMove();
        this.handlerAnimation();
    }

    /**
     * Handle character movement based on keyboard input.
     */
    handlerMove() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.walkSound();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.walkSound();
                this.otherDirection = true;
            }
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                this.jumpSound();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Handle character animation based on state.
     */
    handlerAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.gameOver();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.currentTime = null;
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.currentTime = null;
            } else {
                this.smallHandlerAnimation();
            }
        }, 50);
    }

    /**
    * Handle game animation for resting.
    */
    smallHandlerAnimation() {
            if (keyboard.RIGHT || keyboard.LEFT) {
                this.currentTime = null;
                this.playAnimation(this.IMAGES_WALKING);
            }
         else {
            this.playAnimation(this.IMAGES_IDLE);
            let elapsedTime = 0;
            if (this.currentTime === null) {
                this.currentTime = new Date().getTime();
            }
            elapsedTime = new Date().getTime() - this.currentTime;
            if (elapsedTime >= 3000) {
                this.playAnimation(this.IMAGES_SLEEP);
            }
        }
    }
    /**
     * Handle game over state.
     */
    gameOver() {
        this.gameOver_Sound.volume = 0.3;
        this.x -= 150;
        this.y = 0;
        this.height = 480;
        this.width = 780;
        this.otherDirection = false;
        this.loadImage('img/9_intro_outro_screens/game_over/game over!.png');

        clearAllIntervals();
        if (soundMute) {
            this.gameOver_Sound.muted = true;
        } else {
            this.gameOver_Sound.muted = false;
            this.gameOver_Sound.play();
        }
    }
}
