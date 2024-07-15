class SalsaBar extends DrawableObject {

    IMAGES_SALSA = [
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];
    percentage = 0;

   

    constructor() {
        super();
        this.loadImages(this.IMAGES_SALSA);
        this.x = 50;
        this.y = 50;
        this.width = 250;
        this.height = 65;
        this.setPercentage(0);
    }

    //setPercentage(50)
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_SALSA[this.resolveImageIndex()];
       
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