/**
 * Represents the game world with various game elements and interactions.
 */
class World {
    // Game elements and attributes
    character = new Character();
    level = Level1;
    canvas;
    ctx; // ctx stands for context
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    salsaBar = new SalsaBar();
    coinBar = new CoinBar();
    salsaCache = 0;
    coinCache = 0;
    stopRunIntervalID;
    throwBottleSound = new Audio('audio/throw.mp3');
    deadChickenSound = new Audio('audio/deadChicken.mp3');
    hitChickenSound = new Audio('audio/glass.mp3');
    backgroundSound = new Audio('audio/backgroundMusic.mp3');
    onehit = false;

    /**
     * Creates a new World instance with the specified canvas and keyboard input.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the game.
     * @param {Keyboard} keyboard - The keyboard input handler for the game.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
        this.run();
        this.resetOnehit();
    }

    /**
     * Sets up initial configurations and associations for the game world.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach((enemy) => {
            enemy.characterX = this.character.x;
            this.playMusic(); // Corrected method name
        });
    }

    /**
     * Plays the background music with optional mute check.
     */
    playMusic() {
        this.backgroundSound.volume = 0.3;
        if (soundMute) {
            this.backgroundSound.muted = true;
        } else {
            this.backgroundSound.muted = false;
            this.backgroundSound.play();
        }
    }

    /**
     * Initiates the game loop to run various game logic checks at regular intervals.
     */
    run() {
        this.stopRunIntervalID = setInterval(() => {
            this.checkCollisions();
            this.checkCollectSalsa();
            this.checkCollectCoin();
            this.hitChicken();
            this.hitChickenboss(); // Corrected method name
            this.checkThrowObjects();
        }, 1000 / 20);
    }

    /**
     * Checks if the space key is pressed and initiates throwing a bottle object.
     * Updates salsa cache and plays throw sound if conditions are met.
     */
    checkThrowObjects() {
        this.throwBottleSound.volume = 0.2;
        if (this.keyboard.SPACE && this.salsaCache !== 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.salsaCache -= 20;
            this.salsaBar.setPercentage(this.salsaCache);
            if (soundMute) {
                this.throwBottleSound.muted = true;
            } else {
                this.throwBottleSound.muted = false;
                this.throwBottleSound.play();
            }
        }
    }

    /**
     * Handles the logic for hitting chickens with thrown objects.
     * Plays corresponding sounds and updates chicken animations upon collision.
     */
    hitChicken() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy) && !(enemy instanceof Endboss)) {
                    if (soundMute) {
                        this.deadChickenSound.muted = true;
                        this.hitChickenSound.muted = true;
                    } else {
                        this.deadChickenSound.muted = false;
                        this.hitChickenSound.muted = false;
                        this.deadChickenSound.play();
                        this.hitChickenSound.play();
                    }
                    enemy.offset = 100;
                    enemy.playAnimation(enemy.IMAGES_DEAD_CHICKI);
                    clearInterval(enemy.animateIntervalID); // Corrected property name
                    clearInterval(enemy.animateIntervalID2); // Corrected property name
                }
            });
        });
    }

    /**
     * Resets the one-hit flag after a certain interval.
     */
    resetOnehit() {
        setInterval(() => {
            if (this.onehit == true) {
                this.onehit = false;
            }
        }, 2000);
    }

    /**
     * Handles the logic for hitting the end boss chicken.
     * Initiates boss hit action and plays corresponding sound.
     */
    hitChickenboss() {
        this.level.enemies.forEach((Endboss) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(Endboss) && !Endboss.isDead() && this.onehit == false) {
                    this.onehit = true;
                    Endboss.hitBoss();
                    Endboss.playAnimation(Endboss.IMAGES_HURT_BOSS);
                    Endboss.animate(); // Assuming this method exists
                    if (soundMute) {
                        this.hitChickenSound.muted = true;
                    } else {
                        this.hitChickenSound.muted = false;
                        this.hitChickenSound.play();
                    }
                }
            });
        });
    };

    /**
     * Checks collisions between character and enemies, handles corresponding actions.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!this.character.isAboveGround()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                } else {
                    enemy.isColliding(this.character);
                    if (soundMute) {
                        this.deadChickenSound = true; // Correction: should be muted
                    } else {
                        this.deadChickenSound.muted = false;
                        this.deadChickenSound.play();
                    }
                    enemy.offset = 100;
                    enemy.playAnimation(enemy.IMAGES_DEAD_CHICKI);
                    clearInterval(enemy.animateIntervalID); // Corrected property name
                    clearInterval(enemy.animateIntervalID2); // Corrected property name
                }
            }
        });
    }

    /**
     * Checks for salsa collection by the character from bottles.
     * Updates salsa cache and removes collected bottles from level.
     */
    checkCollectSalsa() {
        this.level.bottles.forEach((salsa, i) => {
            if (this.character.isColliding(salsa) && this.salsaCache !== 100) {
                this.character.collectSalsa();
                this.salsaCache += 20;
                this.salsaBar.setPercentage(this.salsaCache);
                this.level.bottles.splice(i, 1);
            }
        });
    }

    /**
     * Checks for coin collection by the character from coins.
     * Updates coin cache and removes collected coins from level.
     */
    checkCollectCoin() {
        this.level.coins.forEach((coins, i) => {
            if (this.character.isColliding(coins) && this.coinCache != 100) {
                this.coinCache += 20;
                this.coinBar.setPercentage(this.coinCache);
                this.level.coins.splice(i, 1);
            }
        });
    }

    /**
     * Main draw function that renders all game elements on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObject);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

        this.ctx.translate(-this.camera_x, 0);
        //------space for fixed obj------
        this.addToMap(this.statusBar);
        this.addToMap(this.salsaBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        // Draw is called repeatedly
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };

    /**
     * Helper function to add multiple objects to the map for drawing.
     * @param {Array} objects - Array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds an object to the canvas map for drawing.
     * @param {DrawableObject} mo - The object to add to the map.
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
     * Flips the image horizontally for objects that need it.
     * @param {DrawableObject} mo - The object whose image needs flipping.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1; // Correction: should translate x coordinate as well
    }

    /**
     * Restores the original image orientation after flipping.
     * @param {DrawableObject} mo - The object whose image was flipped.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1; // Correction: should translate x coordinate as well
        this.ctx.restore();
    }
};
