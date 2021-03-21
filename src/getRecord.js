const getRecordMap = require("./getRecordNameMap");

async function getRecord(zoneId, recordName, type = "A", useCache = true) {
    const recordMap = await getRecordMap(zoneId, useCache);

    const records = recordMap[recordName];
    if (!records) {
        return null;
    }

    return records[type] || null;
}

module.exports = getRecord;
