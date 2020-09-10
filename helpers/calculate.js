const uselessProperties = ['source', 'GB data saved', 'ash analysis', 'tokens'];

const removeUselessProperties = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (uselessProperties.includes(key)) {
            delete obj[key];
        }
    });
    return obj;
};

module.exports = function (globalStats, countryTotals, fullTimeline) {
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

    const timeData = removeUselessProperties(fullTimeline).data;

    const countriesTimeline = {};

    timeData.forEach((el, i) =>{
       const countryCode = el.countrycode;
       if (!countriesTimeline[countryCode]){
           countriesTimeline[countryCode] = [];
       }
       delete el.countrycode;
       countriesTimeline[countryCode].push(el);
   });

    const globalTimeline = Object.values(countriesTimeline).reduce((acc, curEl) => {
            curEl.forEach((el) => {
                let index = acc.findIndex(el2 => el.date === el2.date);
                if (index !== -1) {
                    acc[index] = {
                        ...acc[index],
                        cases: +el.cases + +acc[index].cases,
                        deaths: +el.deaths + +acc[index].deaths,
                        recovered: +el.recovered + +acc[index].recovered,
                    }
                } else {
                    acc.push(el);
                }
            });
            return acc;
    }).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

    return {
        globalStatsCalculated: removeUselessProperties(Object.assign(globalStats, total)),
        countryTotalsArray,
        countriesTimeline: countriesTimeline,
        globalTimeline
    };
};