class Endboss extends MovableObject {
    height = 350;
    width = 350;
    y = 100;
    offset = {
        top: 50,
        left: 20,
        right: 20,
        bottom: 20
    };
    animateIntervallIDBoss;
    animateIntervallIDBoss2;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',

    ];
    IMAGES_HURT_BOSS = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD_BOSS = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
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
    hadFirstContact = false;
    win_sound = new Audio('audio/win.mp3');
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD_BOSS);
        this.loadImages(this.IMAGES_HURT_BOSS);
        this.x = 2300;
        this.animate();
       
    }
    endGame(){
        setTimeout(() => {
            this.height = 480;
            this.width = 720;
            this.x = world.character.x - 100;
            this.y = 0;
            this.loadImage('img/9_intro_outro_screens/win/win_2.png');
            clearAllIntervals();
        }, 2000);
    }
    animate() {
        this.win_sound.volume = 0.1;
        let move = false;
        let i = 0;
        setInterval(() => {
            i++;
            if (this.charakterX > 2500 && !hadFirstContact) {
                this.playAnimation(this.IMAGES_ANIMATE_ENDBOSS)
                i = 0;
                hadFirstContact = true;
            }
        }, 150);

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

        setInterval(() => {
            if (move == true) {
                this.moveLeft();
            }
        }, 1000 / 240);
    }





    moveLeft() {
        this.x -= this.speed;
    }


  


}