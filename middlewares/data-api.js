const apiVirus = require('../api/virustracker');
const calculateHelper = require('../helpers/calculate');

const globalStatModel = require("../db/globalStat");
const countryTotalsModel = require("../db/countryTotals");
const countriesTimelineModel = require("../db/countriesTimeline");

module.exports = async function () {
    const api = await apiVirus();

    if (!api){
        return false;
    }
    const {globalStats, countryTotals, fullTimeline} = api;

    const {globalStatsCalculated, countryTotalsArray, countriesTimeline, globalTimeline} = calculateHelper(globalStats, countryTotals, fullTimeline);

    await globalStatModel.updateGlobalStat(globalStatsCalculated);

    console.log("updateGlobalStat");

    for (const item of countryTotalsArray) {
       await countryTotalsModel.updateCountryTotals(item);
    }
    console.log("updateCountryTotals");

    const timeKeys = Object.keys(countriesTimeline);
    const json = JSON.stringify(globalTimeline);
    await countriesTimelineModel.updateCountriesTimeline('ALL', json);

    console.log("updateCountriesTimeline");

    for (const key of timeKeys) {
        countriesTimeline[key] = countriesTimeline[key].sort((a,b) => {
            return Date.parse(a.date) - Date.parse(b.date);
        });
        const json = JSON.stringify(countriesTimeline[key]);
        await countriesTimelineModel.updateCountriesTimeline(key, json);
    }
    console.log("Заполнение успешно БД завершено");
    return true;
};