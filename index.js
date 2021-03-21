const config = require("./src/getConfig")();
const updateRecords = require("./src/updateRecords");
updateRecords(config.records);
