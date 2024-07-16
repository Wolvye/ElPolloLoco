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
    throwBottle_Sound = new Audio('audio/throw.mp3');
    deadChicken_Sound = new Audio('audio/deadChicken.mp3');
    hitChicken_Sound = new Audio('audio/glass.mp3');
    gameOver_Sound = new Audio('audio/gameOver.mp3');
    background_Sound = new Audio('audio/backgroundMusic.mp3');
    onehit = false;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
        this.run();
        this.resetOnehit();
    }

    musikBox(){
        setInterval(() => {
            if(musik == true){
                this.background_Sound.play();
            }this.background_Sound.muted();

        }, 1000);
 

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
            this.gameOver();
           
            ;
        }, 50);
    }
    checkThrowObjects() {
        if (this.keyboard.SPACE && this.salsaChache !== 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.salsaChache -= 20;
            this.salsaBar.setPercentage(this.salsaChache);
            this.throwBottle_Sound.play();
        }
    }

    hitChicken() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy) && !(enemy instanceof Endboss)) {
                    this.deadChicken_Sound.play();
                    this.hitChicken_Sound.play();
                    enemy.offset = 100;
                    enemy.playAnimation(enemy.IMAGES_DEAD_CHICKI);
                    clearInterval(enemy.animateIntervallID);
                    clearInterval(enemy.animateIntervallID2);

                }
            });
        });
    }
    resetOnehit() {
        setInterval(() => {
            if (this.onehit==true) {
                this.onehit = false; 
            }
            
        }, 2000);
    }
    hitChickenboss() {
        this.level.enemies.forEach((Endboss) => {
            this.throwableObjects.forEach((bottle) => {

                if (bottle.isColliding(Endboss) && !Endboss.isDead() && this.onehit == false) {
                    this.onehit = true;
                    Endboss.hitBoss();
                    console.log("hat noch energie:", Endboss.energy);
                    Endboss.playAnimation(Endboss.IMAGES_HURT_BOSS);
                    Endboss.animate();
                    this.hitChicken_Sound.play();
                // } else if (Endboss.isDead()) {
                //     console.log("ueberlebt mit:", Endboss.energy);
                //     clearInterval(this.level.enemies[6].animateIntervallIDBoss);
                //     clearInterval(this.level.enemies[6].animateIntervallIDBoss2);
                //    // playAnimation(this.level.enemies[6].IMAGES_DEAD_BOSS);
                }
            });
        });
    };

    gameOver() {
        if (this.character.energy == 0)
            clearInterval(world.stopRunIntervallID);
        document.getElementById('gameOverID').classList.add('d-inline');
        
        //this.gameOver_Sound.play();

    };


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!this.character.isAboveGround()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                } else {
                    enemy.isColliding(this.character);
                    this.deadChicken_Sound.play();
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

