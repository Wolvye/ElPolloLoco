/**
 * Represents a movable object in the game, extending DrawableObject.
 */
class MovableObject extends DrawableObject {
    // Initial properties of the movable object
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    fullSalsa = 100;
    salsaEnergy = 0;
    characterX;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Applies gravity effect to the object.
     * Gravity reduces speedY over time causing the object to move downwards.
     */
    apllyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * Objects of type ThrowableObject are always considered above ground.
     * @returns {boolean} True if above ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 185;
        }
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Checks if this object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if colliding, false otherwise.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
     * Plays an animation by cycling through images in the provided array.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    /**
     * Plays an animation once by setting the image to each path in the array sequentially.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimationOnce(images) {
        for (let index = 0; index < images.length; index++) {
            const path = images[index];
            this.img = this.imgCache[path];
        }
    }

    /**
     * Initiates a jump by setting the vertical speed of the object.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Decreases energy of the object due to a normal hit.
     * Updates lastHit timestamp if energy is above 0.
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Decreases energy of the object due to a hit from a boss.
     * Updates lastHit timestamp if energy is above 0.
     */
    hitBoss() {
        this.energy -= 34;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Increases salsa energy of the object when salsa is collected.
     * Updates fullSalsa timestamp if salsaEnergy is above 0.
     */
    collectSalsa() {
        this.salsaEnergy += 20;
        if (this.salsaEnergy < 0) {
            this.salsaEnergy = 0;
        } else {
            this.fullSalsa = new Date().getTime();
        }
    }

    /**
     * Checks if the object is dead based on its energy level.
     * @returns {boolean} True if energy is 0, indicating the object is dead.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the object is hurt based on the time elapsed since last hit.
     * @returns {boolean} True if less than 1 second has passed since last hit, indicating the object is hurt.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }
}
