class Level {
    enemies;
    clouds;
    backgroundObject;
    level_end_x = 2000;
    coins;
    bottles;
    
    constructor(enemies, clouds, backgroundObject, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.coins = coins;
        this.bottles = bottles;

    }
}