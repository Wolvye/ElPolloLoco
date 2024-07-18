// Class representing the game world
class World {
    character = new Character();
    level = Level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    salsaBar = new SalsaBar();
    coinBar = new CoinBar();
    salsaChache = 0;
    coinCache = 0;
    stopRunIntervallID;
    throwBottle_Sound = new Audio('audio/throw.mp3');
    deadChicken_Sound = new Audio('audio/deadChicken.mp3');
    hitChicken_Sound = new Audio('audio/glass.mp3');
    onehit = false;
    bottleThrow = true;

    /**
     * Constructor for initializing the game world.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     * @param {KeyboardHandler} keyboard - The keyboard handler for input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
        this.run();
        this.resetOnehit();
        this.soundChicken();
        this.soundThrowBottle();
        this.soundDeadChicken();
    }

    /**
     * Sets up initial game state, including character and enemy positions.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach((enemy) => {
            enemy.characterX = this.character.x;
        });
    }

    /**
     * Main game loop that runs at an interval.
     */
    run() {
        this.stopRunIntervallID = setInterval(() => {
            this.checkCollectSalsa();
            this.checkCollectCoin();
            this.hitChicken();
            this.hitChickenboss();
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000 / 50);
    }

    /**
     * Checks conditions for throwing objects and performs actions accordingly.
     */
    checkThrowObjects() {
        this.throwBottle_Sound.volume = 0.2;
        if (this.keyboard.D && this.salsaChache !== 0 && this.bottleThrow == true) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.bottleThrow = false;
            setTimeout(() => {
                this.bottleThrow = true;
            }, 500);
            this.throwableObjects.push(bottle);
            this.salsaChache -= 20;
            this.salsaBar.setPercentage(this.salsaChache);
            this.soundThrowBottle();
        }
    }

    /**
     * Plays the sound for throwing a bottle.
     */
    soundThrowBottle() {
        if (soundMute) {
            this.throwBottle_Sound.muted = true;
        } else {
            this.throwBottle_Sound.muted = false;
            this.throwBottle_Sound.play();
        }
    }
    soundDeadChicken() {
        if (soundMute) {
            this.deadChicken_Sound.muted = true;
        } else {
            this.deadChicken_Sound.muted = false;
            this.deadChicken_Sound.play();
        }
    }
    /**
     * Checks for hits on regular chickens and performs actions accordingly.
     */
    hitChicken() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy) && !(enemy instanceof Endboss)) {
                    this.soundChicken();
                    enemy.offset = 100;
                    enemy.playAnimation(enemy.IMAGES_DEAD_CHICKI);
                    clearInterval(enemy.animateIntervallID);
                    clearInterval(enemy.animateIntervallID2);
                    clearInterval(enemy.animateIntervallID3);
                }
            });
        });
    }

    /**
     * Plays the sound for hitting a chicken.
     */
    soundChicken() {
        if (soundMute) {
            this.deadChicken_Sound.muted = true;
            this.hitChicken_Sound.muted = true;
        } else {
            this.deadChicken_Sound.muted = false;
            this.hitChicken_Sound.muted = false;
            this.deadChicken_Sound.play();
            this.hitChicken_Sound.play();
        }
    }

    /**
     * Resets the onehit flag after a delay.
     */
    resetOnehit() {
        setInterval(() => {
            if (this.onehit == true) {
                this.onehit = false;
            }
        }, 2000);
    }

    /**
     * Checks for hits on the boss chicken and performs actions accordingly.
     */
    hitChickenboss() {
        this.level.enemies.forEach((Endboss) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(Endboss) && !Endboss.isDead() && this.onehit == false) {
                    this.onehit = true;
                    Endboss.hitBoss();
                    Endboss.playAnimation(Endboss.IMAGES_HURT_BOSS);
                    Endboss.animate();
                    if (soundMute) {
                        this.hitChicken_Sound.muted = true;
                    } else {
                        this.hitChicken_Sound.muted = false;
                        this.hitChicken_Sound.play();
                    }
                }
            });
        });
    };

    /**
     * Checks for collisions between character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!this.character.isAboveGround()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                } else {
                    enemy.isColliding(this.character);
                    this.soundDeadChicken();
                    enemy.offset = 100;
                    if (enemy instanceof Chicken) {
                        enemy.playAnimation(enemy.IMAGES_DEAD_CHICKI);
                        clearInterval(enemy.animateIntervallID);
                        clearInterval(enemy.animateIntervallID2);
                    } else if (enemy instanceof SmallChicken) {
                        enemy.playAnimation(enemy.IMAGES_SMALL_CHICKEN_DEAD);
                        clearInterval(enemy.animateIntervallID3);
                        clearInterval(enemy.animateIntervallID4);
                    }
                }
            }
        });
    }

    /**
     * Checks for salsa bottles collected by the character.
     */
    checkCollectSalsa() {
        this.level.bottles.forEach((salsa, i) => {
            if (this.character.isColliding(salsa) && this.salsaChache !== 100) {
                this.character.collectSalsa();
                this.salsaChache += 20;
                this.salsaBar.setPercentage(this.salsaChache);
                this.level.bottles.splice(i, 1);
            }
        })
    }

    /**
     * Checks for coins collected by the character.
     */
    checkCollectCoin() {
        this.level.coins.forEach((coins, i) => {
            if (this.character.isColliding(coins) && this.coinCache != 100) {
                this.coinCache += 20;
                this.coinBar.setPercentage(this.coinCache);
                this.level.coins.splice(i, 1);
            }
        })
    }

    /**
     * Renders all game objects on the canvas in the correct order.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObject);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

        this.ctx.translate(-this.camera_x, 0);
        // Fixed objects rendering
        this.addToMap(this.statusBar);
        this.addToMap(this.salsaBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };

    /**
     * Helper function to add multiple objects to the map.
     * @param {Array} objects - Array of objects to be added.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Renders an object on the canvas and handles image flipping if necessary.
     * @param {Object} mo - Object to be rendered.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image for an object horizontally.
     * @param {Object} mo - Object whose image is to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original image orientation after flipping.
     * @param {Object} mo - Object whose image is to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
};
