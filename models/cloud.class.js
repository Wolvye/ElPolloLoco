class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 300;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;  //die Chicken starten dadurch an unterschiedlichen stellen
        this.animate();
    }
    //für die Bewegung der Wolken 
    animate() {
        this.moveLeft()
    }
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}
