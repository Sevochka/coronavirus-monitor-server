const api = require('../api/virustracker');
const calculateHelper = require('../helpers/calculate');

const globalStatModel = require("../db/globalStat");
const countryTotalsModel = require("../db/countryTotals");

module.exports = async function () {
    // let {globalStats, countryTotals, fullTimeline} = await api();
    // const {globalStatsCalculated, countryTotalsArray} = calculateHelper(globalStats, countryTotals, fullTimeline);
    //
    // await globalStatModel.updateGlobalStat(globalStatsCalculated);
    //
    // for (const item of countryTotalsArray) {
    //    await countryTotalsModel.updateCountryTotals(item);
    // }

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