module.exports = class TowerData{
    name="tower";
    fire_rate = 1;
    damage = 1;
    radius = 5;

    constructor(name, fire_rate, damage, radius){
        this.name = name;
        this.fire_rate = fire_rate;
        this.damage = damage;
        this.radius = radius;
    }
}