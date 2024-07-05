class MovableObject {
    x = 120;
    y = 185;
    img;
    height = 120;
    width = 100;
    imgCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right')

    };

    moveLeft() {
        console.log('Moving right')

    };
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 100 );
    }
}
