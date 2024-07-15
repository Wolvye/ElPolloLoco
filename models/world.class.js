class World {
    character = new Character();
    level = Level1;
    canvas;
    ctx; //ctx steht für context
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    salsaBar = new SalsaBar();
    coinBar = new CoinBar();
    salsaChache = 0;
    coinCache = 0;
    stopRunIntervallID;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
        this.run();
    }
    setWorld() {
        this.character.world = this;
    }
    run() {
        this.stopRunIntervallID = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectSalsa();
            this.checkCollectCoin();
            this.hitChicken();
            this.hitChickenboss();
            ;
        }, 50);
    }
    checkThrowObjects() {
        if (this.keyboard.SPACE && this.salsaChache !== 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.salsaChache -= 20;
            this.salsaBar.setPercentage(this.salsaChache);
        }
    }

    hitChicken() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy) && !(enemy instanceof Endboss)) {
                    console.log("hit das chicken");
                    enemy.offset = 100;
                    enemy.playAnimation(enemy.IMAGES_DEAD_CHICKI);
                    clearInterval(enemy.animateIntervallID);
                    clearInterval(enemy.animateIntervallID2);
                }
            });
        });
    }

    hitChickenboss() {
        this.level.enemies.forEach((Endboss) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(Endboss) && !Endboss.isDead()) {
                    Endboss.hitBoss();
                   // console.log("hat noch energie:" MovableObject.energy);
                    Endboss.playAnimation(Endboss.IMAGES_HURT_BOSS);
                    Endboss.animate();
                } else if(Endboss.isDead()){
                    clearInterval(Endboss.animateIntervallIDBoss);
                    clearInterval(Endboss.animateIntervallIDBoss2);
                    this.playAnimation(IMAGES_DEAD_BOSS);
                }
            });
        });
    }



    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!this.character.isAboveGround()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                } else {
                    enemy.isColliding(this.character);
                    enemy.offset = 100;
                    enemy.playAnimation(enemy.IMAGES_DEAD_CHICKI);
                    clearInterval(enemy.animateIntervallID);
                    clearInterval(enemy.animateIntervallID2);
                }
            }
        });
    }



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

    checkCollectCoin() {
        this.level.coins.forEach((coins, i) => {
            if (this.character.isColliding(coins) && this.coinCache != 100) {

                this.coinCache += 20;
                this.coinBar.setPercentage(this.coinCache);
                this.level.coins.splice(i, 1);


            }
        })
    }

    //achte auf die Reihenfolge! So kann man die Bilder richtig übereinander legen
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
        //Draw wird immer wieder Aufgerufen!
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    };

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);



        if (mo.otherDirection) {
            this.flipImageBack(mo)

        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
};

