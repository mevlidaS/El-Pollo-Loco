class Level {
    enemies;
    clouds;
    backgroundObjects;
    endboss;
    coins;
    bottles;
    level_end_x = 3500;

    /**
     * Initializes the Level with enemies, endboss, clouds, coins, bottles, and backgroundObjects.
     *
     * @param {type} enemies - Description of enemies parameter
     * @param {type} endboss - Description of endboss parameter
     * @param {type} clouds - Description of clouds parameter
     * @param {type} coins - Description of coins parameter
     * @param {type} bottles - Description of bottles parameter
     * @param {type} backgroundObjects - Description of backgroundObjects parameter
     * @return {type} No return value
     */
    constructor(enemies,endboss, clouds,coins,bottles, backgroundObjects ) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}