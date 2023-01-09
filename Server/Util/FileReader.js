const fs = require("fs");

module.exports = class FileReader{
    static fdata = {error:false, data:null};

    static GetFileData(location){
        var contents = fs.readFileSync(location, {encoding:'utf8'});
        FileReader.fdata = {error:false, data:contents};
        return FileReader.fdata;
    }
}