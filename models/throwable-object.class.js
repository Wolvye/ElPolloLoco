/**
 * Represents a throwable object in the game, extending MovableObject.
 */
class ThrowableObject extends MovableObject {
    offset = {
        top: 10,
        left: 30,
        right: 30,
        bottom: 10,
    };

    /**
     * Creates a new ThrowableObject at the specified coordinates.
     * @param {number} x - The initial x coordinate.
     * @param {number} y - The initial y coordinate.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.throw();
    }

    /**
     * Initiates the throwing action of the object.
     */
    throw() {
        this.speedY = 30;
        this.apllyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}
