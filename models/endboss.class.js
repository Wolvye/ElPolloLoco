class Endboss extends MovableObject{
    height=350;
    width=350;
    y=100;
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

    ]
    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x=2300;
        this.animate();
    }
    animate() {
        this.moveLeft();
        setInterval(() => {
          this.playAnimation(this.IMAGES_WALKING);
        }, 300)
}
moveLeft(){
    setInterval(()=>{
        this.x -=this.speed;
    },1000/240);
}
}