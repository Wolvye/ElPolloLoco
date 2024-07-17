/**
 * Represents a salsa bar status indicator, extending DrawableObject.
 */
class SalsaBar extends DrawableObject {
    // Array of image paths representing salsa bar percentages
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
        // Load images and set initial position and dimensions
        this.loadImages(this.IMAGES_SALSA);
        this.x = 50;
        this.y = 50;
        this.width = 250;
        this.height = 65;
        // Set initial percentage
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of salsa filled in the bar and updates the displayed image.
     * @param {number} percentage - The percentage of salsa filled (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_SALSA[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
     * Determines the index of the image in IMAGES_SALSA based on the current percentage.
     * @returns {number} Index of the image in IMAGES_SALSA.
     */
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
