const TowerData = require("./Tower/TowerData.js");

modules.exports = class Towers{
    static Init(){
        Towers.light_turret = new TowerData("Light Turret", 1, 5, 3);
    }
}