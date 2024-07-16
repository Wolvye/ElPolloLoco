class Character extends MovableObject {
    height = 250;
    width = 150;
    speed = 10;
    y = 80;
    offset = {
        top: 100,
        left: 40,
        right: 40,
        bottom: 10
    };
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
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
    ]
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',

    ]
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    world;

    walking_sound = new Audio('audio/run.mp3');
    jump_sound = new Audio('audio/jump.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.animate();
        this.apllyGravity();
        
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                if (soundMute) {
                    this.walking_sound.muted = true;
                } else {
                    this.walking_sound.muted = false;
                    this.walking_sound.play();
                }
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                if (soundMute) {
                    this.walking_sound.muted = true;
                } else {
                    this.walking_sound.muted = false;
                    this.walking_sound.play();
                }
                this.otherDirection = true;
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                if (soundMute) {
                    this.jump_sound.muted = true;
                } else {
                    this.jump_sound.muted = false;
                    this.jump_sound.play();
                }

            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);

            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);

            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {


                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { // Lauf Animation
                    this.playAnimation(this.IMAGES_WALKING);

                }
            }
        }, 50);
    }
    gameOver(){
        if(energy <=0){
        setTimeout(() => {
            this.height = 480;
            this.width = 720;
            this.x = world.character.x ;
            this.y = 0;
            this.loadImage('img/9_intro_outro_screens/game_over/game over!.png');
            clearAllIntervals();
        }, 2000);}
    }

}

