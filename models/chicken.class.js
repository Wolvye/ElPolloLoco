class Chicken extends MovableObject {
    height = 50;
    width = 50;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;  //die Chicken starten dadurch an unterschiedlichen stellen
        this.y = 430 - this.height;
        this.animate();
        this.loadImages(this.IMAGES_WALKING);
        this.speed=0.15+Math.random()*0.25; // für Random Bewegungsgeschwindigkeit der objekte

    }


        animate() {
            this.moveLeft();
            setInterval(() => {
                let i = this.currentImage % this.IMAGES_WALKING.length; //let i =0% 6. Modulu ist der Mathematische Rest.
                let path = this.IMAGES_WALKING[i];
                this.img = this.imgCache[path];
                this.currentImage++;
            }, 200)
            
        }
        moveLeft(){
            setInterval(()=>{
                this.x -=this.speed;
            },1000/120);
        }
    
}