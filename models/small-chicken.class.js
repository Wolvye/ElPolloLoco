class SmallChicken extends MovableObject {
    width = 50;
    height = 50;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    IMAGES_SMALL_CHICKEN_WALK =[
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_SMALL_CHICKEN_DEAD =[
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 200 + Math.random() * 3000;
        this.y = 430 - this.height;
        this.loadImages(this.IMAGES_SMALL_CHICKEN_WALK);
        this.loadImages(this.IMAGES_SMALL_CHICKEN_DEAD);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    };
    animate(){
        this.animateIntervallID3 = setInterval(() => {
            this.moveLeft();

        }, 1000 / 60);
        this.animateIntervallID4 = setInterval(() => {
            this.playAnimation(this.IMAGES_SMALL_CHICKEN_WALK);
        }, 200);

    };
}