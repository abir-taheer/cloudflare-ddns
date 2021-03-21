const cloudflare = require("./cloudflare");

const cache = {};

async function getRecordNameMap(zoneId, useCache) {
    if (useCache && cache[zoneId]) {
        return cache[zoneId];
    }

    const recordMap = {};

    const { result } = await cloudflare.dnsRecords.browse(zoneId);

    result.forEach((record) => {
        if (!recordMap[record.name]) {
            recordMap[record.name] = {};
        }
        recordMap[record.name][record.type] = record;
    });

    cache[zoneId] = recordMap;

    return recordMap;
}

module.exports = getRecordNameMap;
