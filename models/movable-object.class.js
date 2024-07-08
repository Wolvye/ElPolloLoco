class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit=0;

    apllyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 185;
    }
   

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;

    }



    isColliding(mo) {
        return (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) &&
            (this.x + this.height) >= mo.x &&
            (this.x) <= (mo.x + mo.height);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; //let i =0% 6. Modulu ist der Mathematische Rest.
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }
    hit() {

        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        }else{
            this.lastHit= new Date().getTime();
        }
    }
    isDead() {
        return this.energy == 0;

    }
    isHurt(){
        let timepassed=new Date().getTime() - this.lastHit; //differenz in ms
        timepassed = timepassed /1000;
        return timepassed <1;
    }
}
