const axios = require("axios");

async function getIpAddress() {
    const response = await axios.get("https://api64.ipify.org?format=text");
    return response.data;
}

module.exports = getIpAddress;
