const api = require('../api/virustracker');
const calculateHelper = require('../helpers/calculate');

const globalStatModel = require("../db/globalStat");
const countryTotalsModel = require("../db/countryTotals");
const countriesTimelineModel = require("../db/countriesTimeline");

module.exports = async function () {
    let {globalStats, countryTotals, fullTimeline} = await api();
    const {globalStatsCalculated, countryTotalsArray, countriesTimeline} = calculateHelper(globalStats, countryTotals, fullTimeline);

    // await globalStatModel.updateGlobalStat(globalStatsCalculated);
    //
    // for (const item of countryTotalsArray) {
    //    await countryTotalsModel.updateCountryTotals(item);
    // }


    const timeKeys = Object.keys(countriesTimeline);

    for (const key of timeKeys) {
        countriesTimeline[key] = countriesTimeline[key].sort((a,b) => {
            return Date.parse(a.date) - Date.parse(b.date);
        });
        const json = JSON.stringify(countriesTimeline[key]);
        await countriesTimelineModel.updateCountriesTimeline(key, json);
    }

    console.log("Заполнение успешно БД завершено")


    // countryTotalsArray.forEach((el) => {
    //     countryTotalsModel.updateCountryTotals(el);
    // })

    // test.addGroup(removeUselessProperties(globalStatHelper(globalStats, countryTotals)))
    //     .then((el) => {
    //         console.log(el)
    //     }).catch((err) => {
    //     console.log(err)
    // });

    // test.getGlobalStat()
    //     .then((el) => {
    //         console.log(el)
    //     }).catch((err) => {
    //     console.log(err)
    // });
};