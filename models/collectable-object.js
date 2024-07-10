class CollectableObject extends DrawableObject {
    IMAGE_COINS = [
        'img/8_coin/coin_2.png'
    ];
    IMAGE_SALSA = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor(item,x) {
        super();

        if (item == 'salsa') {
            this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
            this.width = 80;
            this.height = 100;
            this.x = x;
            this.y = 340;
        } else {
            this.loadImage('img/8_coin/coin_2.png');
            this.height = 150;
            this.width = 150;
            this.x = x;
            this.y = 150;
        };
    }
}9