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
    IMAGES_HURT_BOSS=[
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]
    IMAGES_DEAD_BOSS = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD_BOSS);
        this.loadImages(this.IMAGES_HURT_BOSS);
        this.x = 2300;
        this.animate();
    }
    animate() {
        this.moveLeft();
        this.animateIntervallIDBoss = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 300)
    }
    moveLeft() {
        this.animateIntervallIDBoss2 = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 240);
    }
}