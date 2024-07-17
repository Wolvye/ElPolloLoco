/**
 * Class representing a collectable object.
 * @extends DrawableObject
 */
class CollectableObject extends DrawableObject {
    /**
     * Image path for the coin.
     * @type {string[]}
     */
    IMAGE_COINS = [
        'img/8_coin/coin_2.png'
    ];

    /**
     * Image paths for the salsa bottle.
     * @type {string[]}
     */
    IMAGE_SALSA = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    
    /**
     * Create a collectable object.
     * @param {string} item - The type of item ('salsa' or 'coin').
     * @param {number} x - The initial x-coordinate.
     */
    constructor(item, x) {
        super();
        
        if (item === 'salsa') {
            this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
            this.width = 80;
            this.height = 100;
            this.x = x;
            this.y = 340;
            this.offset = {
                top: 20,
                left: 60,
                right: 40,
                bottom: 0
            };
        } else {
            this.loadImage('img/8_coin/coin_2.png');
            this.width = 150;
            this.height = 150;
            this.x = x;
            this.y = 150;
            this.offset = {
                top: 50,
                left: 50,
                right: 50,
                bottom: 50
            };
        }
    }
}
