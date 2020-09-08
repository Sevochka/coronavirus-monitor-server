module.exports = function (globalStats, countryTotals) {
    const total = {
        totalNewCasesToday: 0,
        totalNewDeathsToday: 0,
        totalSeriousCases: 0,
        totalActiveCases: 0
    };

    Object.keys(countryTotals).forEach((key) => {
        if (key === "stat"){
            return;
        }
        const element = countryTotals[key];
        element.renamePropertiesToCamel();

        total.totalNewCasesToday += element['totalNewCasesToday'];
        total.totalNewDeathsToday += element['totalNewDeathsToday'];
        total.totalSeriousCases +=  element['totalSeriousCases'];
        total.totalActiveCases += element['totalActiveCases'];
    });
    globalStats.renamePropertiesToCamel();
    return Object.assign(globalStats, total);
};