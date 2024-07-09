class CollectableObject extends DrawableObject {
    IMAGE_COINS = [
        'img/8_coin/coin_2.png'
    ];
    IMAGE_SALSA = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor(ITEM,x) {
        super();

        if (this.item != 'salsa') {
            this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
            this.width = 200;
            this.height = 150;
            this.x = x;
            this.y = 300;
        } else {
            this.loadImage('img/8_coin/coin_2.png');
            this.height = 150;
            this.width = 150;
            this.x = x;
            this.y = 150;
        };
    }
}