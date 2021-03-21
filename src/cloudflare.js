const config = require("./getConfig")();
const cloudflare = require("cloudflare")(config.auth);
module.exports = cloudflare;
