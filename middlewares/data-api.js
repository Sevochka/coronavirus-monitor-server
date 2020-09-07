const api = require('../api/virustracker');
const globalStatHelper =  require('../helpers/globalStat');

let timer;
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

        let {globalStats, countryTotals} = await api();

        req.globalStats = removeUselessProperties(globalStatHelper(globalStats, countryTotals));

    } else {

    }
    next();
};