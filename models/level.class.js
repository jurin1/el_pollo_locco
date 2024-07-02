/**
 * Represents a level in the game, containing various game objects such as enemies, clouds, background objects, bottles, and coins.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2157;

    /**
     * Constructs a Level object.
     * @param {Array} enemies - The list of enemies in the level.
     * @param {Array} clouds - The list of clouds in the level.
     * @param {Array} backgroundObjects - The list of background objects in the level.
     * @param {Array} bottles - The list of bottles in the level.
     * @param {Array} coins - The list of coins in the level.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}
