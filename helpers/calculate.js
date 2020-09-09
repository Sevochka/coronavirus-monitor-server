const uselessProperties = ['source', 'stat'];

const removeUselessProperties = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (uselessProperties.includes(key)) {
            delete obj[key];
        }
    });
    return obj;
};

module.exports = function (globalStats, countryTotals) {
    const total = {
        totalNewCasesToday: 0,
        totalNewDeathsToday: 0,
        totalSeriousCases: 0,
        totalActiveCases: 0
    };

    let countryTotalsArray = [];
    Object.keys(countryTotals).forEach((key) => {
        if (key === "stat") {
            return;
        }
        const element = removeUselessProperties(countryTotals[key]);
        element.renamePropertiesToCamel();
        countryTotalsArray.push(element);
        total.totalNewCasesToday += element['totalNewCasesToday'];
        total.totalNewDeathsToday += element['totalNewDeathsToday'];
        total.totalSeriousCases += element['totalSeriousCases'];
        total.totalActiveCases += element['totalActiveCases'];
    });
    globalStats.renamePropertiesToCamel();


    return {
        globalStatsCalculated: removeUselessProperties(Object.assign(globalStats, total)),
        countryTotalsArray
    };
};