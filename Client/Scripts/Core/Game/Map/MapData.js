class MapData{
    name = "";
    difficulty = "easy";
    size = {width:0, height:0};
    background_image = null;
    mapdata = [];

    constructor(name, difficulty, width, height, background_image, mapdata){
        this.name = name;
        this.difficulty = difficulty;
        this.size.width = width;
        this.size.height = height;
        this.background_image = background_image;
        this.mapdata = mapdata;
    }
}