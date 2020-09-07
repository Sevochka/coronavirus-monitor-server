let timer;
const axios = require('axios');

const uselessProperties = ['source'];

const removeUselessProperties = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (uselessProperties.includes(key)){
            delete obj[key];
        }
    });
    return obj;
};

module.exports = async function (req, res, next) {
    if (!timer) {
        timer = 1;
        let globalStat = await axios
            .get('https://api.thevirustracker.com/free-api?global=stats')
            .then((res) => {
                return res.data.results[0];
            })
            .catch((err) => err);
        let countryTotals = await axios
            .get('https://api.thevirustracker.com/free-api?countryTotals=ALL')
            .then((res) => {
               return res.data.countryitems[0];
            })
            .catch((err) => err);

        let total = {
            totalNewCasesToday: 0,
            totalNewDeathsToday: 0,
            totalSeriousCases: 0,
            totalActiveCases: 0
        };

        Object.values(countryTotals).forEach((el) => {
            if (typeof el !== "object"){
                return;
            }

            total.totalNewCasesToday += el['total_new_cases_today'];
            total.totalNewDeathsToday +=  el['total_new_deaths_today'];
            total.totalSeriousCases +=  el['total_serious_cases'];
            total.totalActiveCases += el['total_active_cases'];
        });
        globalStat.renamePropertiesToCamel();
        removeUselessProperties(globalStat);
        total.renamePropertiesToCamel();
        req.globalStat = Object.assign(globalStat, total);

    } else {

    }
    next()
};