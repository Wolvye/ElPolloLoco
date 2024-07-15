class CoinBar extends DrawableObject {

    IMAGES_COIN = [
     'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
     'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
     'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
     'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
     'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
     'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];
    percentage = 0;

   

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 450;
        this.y = 0;
        this.width = 250;
        this.height = 65;
        this.setPercentage(0);
    }

    //setPercentage(50)
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imgCache[path];

    }
    

    resolveImageIndex() {

        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }

    }



}