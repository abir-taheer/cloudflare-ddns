const cloudflare = require("./cloudflare");

let zoneMap = null;

async function getZoneNameMap(useCache = true) {
    if (useCache && zoneMap) {
        return zoneMap;
    } else {
        zoneMap = {};
    }

    const zones = await cloudflare.zones.browse();
    const { result } = zones;

    result.forEach((zone) => {
        zoneMap[zone.name] = zone;
    });

    return zoneMap;
}

module.exports = getZoneNameMap;
