class Chicken extends MovableObject {
    height = 50;
    width = 50;
    animateIntervallID;
    animateIntervallID2;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD_CHICKI = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]
    chicken_sound = new Audio('audio/chicken.mp3');

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 3000;  //die Chicken starten dadurch an unterschiedlichen stellen
        this.y = 430 - this.height;
        this.animate();
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.25; // für Random Bewegungsgeschwindigkeit der objekte
        this.loadImages(this.IMAGES_DEAD_CHICKI);
    }


    animate() {
        this.chicken_sound.volume=0.01;
        this.animateIntervallID = setInterval(() => {
            this.moveLeft();
            if (soundMute) {
                this.chicken_sound.muted = true;
            } else {
                this.chicken_sound.muted = false;
                this.chicken_sound.play();
            }
        }, 1000 / 60)

        this.animateIntervallID2 = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200)

    }



}