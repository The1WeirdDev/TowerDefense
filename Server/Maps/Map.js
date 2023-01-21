module.exports = class Map{
    name = "";
    difficulty = "easy";
    width = 0;
    height = 0;
    background_image = "";
    mapdata = [];
    
    constructor(location){
        const MapReader = require("./../Util/MapReader.js");
        var mapdata = MapReader.ReadMapData(location);

        this.name = mapdata.name;
        this.difficulty = mapdata.difficulty;
        this.width = mapdata.size.width;
        this.height = mapdata.size.height;
        this.background_image = mapdata.background_image;
        this.mapdata = mapdata.data;
    }

    GetDataAsObject(){
        return {name:this.name, difficulty:this.difficulty, size:{width:this.width, height:this.height}, background_image:this.background_image,mapdata:this.mapdata};
    }

    GetBlockData(x, y){
        if(x >= 0 && y >= 0 && x < this.width && y < this.height)
            return this.mapdata[(x * this.height) + y];
        else
            return 0;
    }
}