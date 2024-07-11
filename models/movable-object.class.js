class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    fullSalsa = 100;
    salsaEnergy =0;
    fullcoinds = 100;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    apllyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 185;
        }
    }


    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;

    }



    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
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
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    collectSalsa() {

        this.salsaEnergy += 20;
        if (this.salsaEnergy < 0) {
            this.salsaEnergy = 0;
        } else {
            this.fullSalsa = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;

    }
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //differenz in ms
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }
}
