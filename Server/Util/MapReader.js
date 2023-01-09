const FileReader = require("./FileReader.js");

module.exports = class MapReader{
    static ReadMap(location){
        var mapjsondata = FileReader.GetFileData(location);

        try{
            var jsondata = JSON.parse(mapjsondata.data);

            var mapname = jsondata.mapname;
            console.log(mapname);
        }catch(exception){
            //TODO
            console.log(exception);
            return exception;
        }
    }
}