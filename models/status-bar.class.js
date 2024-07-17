/**
 * Represents a status bar indicating hitpoints, extending DrawableObject.
 */
class StatusBar extends DrawableObject {
    IMAGES_HITPOINTS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HITPOINTS);
        this.x = 50;
        this.y = 0;
        this.width = 250;
        this.height = 65;
        // Set initial percentage
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of hitpoints in the status bar and updates the displayed image.
     * @param {number} percentage - The percentage of hitpoints (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HITPOINTS[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
     * Determines the index of the image in IMAGES_HITPOINTS based on the current percentage.
     * @returns {number} Index of the image in IMAGES_HITPOINTS.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
