const api = require('../api/virustracker');
const globalStatHelper = require('../helpers/calculate');

const test = require("../db/test");
const data = require('../db/data');

let timer;
const uselessProperties = ['source'];

const removeUselessProperties = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (uselessProperties.includes(key)) {
            delete obj[key];
        }
    });
    return obj;
};

module.exports = async function (req, res, next) {


    if (!timer) {
        timer = 1;

        let {globalStats, countryTotals} = await api();

        removeUselessProperties(globalStatHelper(globalStats, countryTotals))

        // test.addGroup(removeUselessProperties(globalStatHelper(globalStats, countryTotals)))
        //     .then((el) => {
        //         console.log(el)
        //     }).catch((err) => {
        //     console.log(err)
        // });

        test.getGlobalStat()
            .then((el) => {
                console.log(el)
            }).catch((err) => {
            console.log(err)
        });
    } else {

    }
    next();
};