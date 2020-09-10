const axios = require('axios');

const baseUrl = 'https://api.thevirustracker.com/';
module.exports = async function () {

    try {
        const globalStats = await axios
            .get(`${baseUrl}free-api?global=stats`)
            .then((res) => {
                return res.data.results[0];
            })
            .catch((err) => {
                console.log(err);
            });
        const countryTotals = await axios
            .get(`${baseUrl}free-api?countryTotals=ALL`)
            .then((res) => {
                return res.data.countryitems[0];
            })
            .catch((err) => {
            });
        const fullTimeline = await axios
            .get(`https://thevirustracker.com/timeline/map-data.json`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.log(err)
            });
        return {globalStats, countryTotals, fullTimeline};
    } catch (e) {
        return null;
    }
};