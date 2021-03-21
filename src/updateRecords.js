const cloudflare = require("./cloudflare");
const getRecord = require("./getRecord");
const getIpAddress = require("./getIpAddress");
const getZoneNameMap = require("./getZoneNameMap");

async function updateRecords(records) {
    const ip = await getIpAddress();
    const type = ip.includes(":") ? "AAAA" : "A";

    const zoneMap = await getZoneNameMap(true);

    for (let i = 0; i < records.length; i++) {
        const { zoneName, name, proxied, ttl } = records[i];
        const zone = zoneMap[zoneName];

        if (!zone) {
            throw new Error("There is no zone with the name: " + zoneName);
        }

        // See if there's already a dns record with the current name
        const existingRecord = await getRecord(zone.id, name, type);

        if (existingRecord) {
            // If the record is already up to date, skip it
            if (
                existingRecord.content === ip &&
                existingRecord.proxied === proxied &&
                existingRecord.ttl === ttl
            ) {
                continue;
            }

            try {
                // Otherwise delete the current record
                await cloudflare.dnsRecords.del(
                    existingRecord.zone_id,
                    existingRecord.id
                );
            } catch (e) {
                console.error(
                    "There was an error deleting the existing record for name: " +
                        existingRecord.name,
                    e
                );
                break;
            }
        }

        try {
            // Create a new record with the current ip address
            await cloudflare.dnsRecords.add(zone.id, {
                zone_id: zone.id,
                zone_name: zone.name,
                name,
                type,
                proxied,
                content: ip,
                ttl,
                locked: false,
            });
        } catch (e) {
            console.error(
                "There was an error adding the new record for name: " + name,
                e
            );
        }
    }
}

module.exports = updateRecords;
