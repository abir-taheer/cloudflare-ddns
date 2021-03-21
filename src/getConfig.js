const fs = require("fs");
const path = require("path");

let config = null;

function getConfig(){
    if(! config){
        const file = fs.readFileSync(path.resolve("./../config.json")).toString();

        config = JSON.parse(file);
    }

    return config;
}

module.exports = getConfig;