const uselessProperties = ['source', 'GB data saved', 'ash analysis', 'tokens'];
const fs = require('fs');

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

    // for (let i = 0; i < timeData.length; i++) {
    //
    //     for (let j = 0; j < ; j++) {
    //
    //     }
    //
    // }
    
    

    timeData.forEach((el, i) =>{
       const countryCode = el.countrycode;
       if (!countriesTimeline[countryCode]){
           countriesTimeline[countryCode] = [];
       }
       delete el.countrycode;
       countriesTimeline[countryCode].push(el);
   });


    // Object.keys(countriesTimeline).forEach(key => {
    //     countriesTimeline[key] = countriesTimeline[key].sort((a,b) => {
    //         return Date.parse(a.date) - Date.parse(b.date);
    //     })
    // });
    //
    // console.log(countriesTimeline.RU);



    return {
        globalStatsCalculated: removeUselessProperties(Object.assign(globalStats, total)),
        countryTotalsArray,
        countriesTimeline: countriesTimeline
    };
};