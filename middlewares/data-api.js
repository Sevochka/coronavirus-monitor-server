const api = require('../api/virustracker');
const calculateHelper = require('../helpers/calculate');

const globalStatModel = require("../db/globalStat");


const uselessProperties = ['source'];

const removeUselessProperties = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (uselessProperties.includes(key)) {
            delete obj[key];
        }
    });
    return obj;
};

module.exports = async function () {

        let {globalStats, countryTotals, fullTimeline} = await api();

        removeUselessProperties(calculateHelper(globalStats, countryTotals, fullTimeline));

        globalStatModel.updateGlobalStat(calculateHelper(globalStats, countryTotals))
            .then((el) => {
                console.log(el)
            }).catch((err) => {
            console.log(err)
        });

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