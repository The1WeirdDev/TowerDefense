const FileReader = require("./FileReader.js");

module.exports = class MapReader{
    static ReadMapData(location){
        var mapjsondata = FileReader.GetFileData(location);

        try{
            var jsondata = JSON.parse(mapjsondata.data);

            var name = jsondata.name;
            var difficulty = jsondata.difficulty;
            var mapsize = jsondata.size;
            var width = mapsize.width;
            var height = mapsize.height;
            var data = jsondata.data;

            return {name:name, difficulty: difficulty, size:{width:width, height:height}, data:data};
        }catch(exception){
            //TODO
            console.log(exception);
            return {name:null, difficulty: "easy", size:{width:null, height:null}, data:null};
        }
    }
}