/**
 * Class representing a coin status bar.
 * @extends DrawableObject
 */
class CoinBar extends DrawableObject {
    /**
     * Array of image paths for different percentage levels of the coin bar.
     * @type {string[]}
     */
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    /**
     * Current percentage value of the coin bar.
     * @type {number}
     */
    percentage = 0;

    /**
     * Create a coin bar object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 450;
        this.y = 0;
        this.width = 250;
        this.height = 65;
        this.setPercentage(0);
    }

    /**
     * Set the percentage value of the coin bar and update its displayed image.
     * @param {number} percentage - The percentage value to set (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imgCache[path]; // Assuming imgCache is defined in DrawableObject
    }

    /**
     * Resolve the index of the image array based on the current percentage.
     * @returns {number} The index of the image array.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
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
