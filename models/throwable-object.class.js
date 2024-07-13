class ThrowableObject extends MovableObject {
   
    offset = {
        top: 10,
        left: 30,
        right: 30,
        bottom: 10,
    };
    constructor(x, y) {
        
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.throw();
    }

    throw(x, y) {
            this.speedY = 30;
            this.apllyGravity();
            setInterval(() => {
                this.x += 10;
            }, 25);

        
    }
}