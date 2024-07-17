/**
 * Represents a game level.
 */
class Level {
    /**
     * Array of enemies in the level.
     * @type {Array<Enemy>}
     */
    enemies;

    /**
     * Array of clouds in the background.
     * @type {Array<Cloud>}
     */
    clouds;

    /**
     * Background object of the level.
     * @type {BackgroundObject}
     */
    backgroundObject;

    /**
     * x-coordinate where the level ends.
     * @type {number}
     */
    level_end_x = 2000;

    /**
     * Array of coins in the level.
     * @type {Array<Coin>}
     */
    coins;

    /**
     * Array of bottles or collectable objects in the level.
     * @type {Array<CollectableObject>}
     */
    bottles;
    
    /**
     * Creates a new Level instance.
     * @param {Array<Enemy>} enemies - Array of enemies in the level.
     * @param {Array<Cloud>} clouds - Array of clouds in the background.
     * @param {BackgroundObject} backgroundObject - Background object of the level.
     * @param {Array<CollectableObject>} bottles - Array of bottles or collectable objects in the level.
     * @param {Array<Coin>} coins - Array of coins in the level.
     */
    constructor(enemies, clouds, backgroundObject, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.coins = coins;
        this.bottles = bottles;
    }
}
