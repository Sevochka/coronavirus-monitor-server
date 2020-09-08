const {selectData, changeData} = require('sqlite3-simple-api');

const createGroupTable =
    `CREATE TABLE IF NOT EXISTS 'GlobalStat' (
    'totalCases' TEXT NOT NULL,
    'totalRecovered' TEXT,
    'totalUnresolved' TEXT NOT NULL,
    'totalDeaths' TEXT NOT NULL,
    'totalNewCasesToday' TEXT NOT NULL,
    'totalNewDeathsToday' TEXT NOT NULL,
    'totalActiveCases' TEXT NOT NULL,
    'totalSeriousCases' TEXT NOT NULL,
    'totalAffectedCountries' TEXT NOT NULL
    );`;
changeData(createGroupTable);

exports.addGroup = function (globalStat) {
    const {totalCases, totalRecovered, totalUnresolved, totalDeaths, totalNewCasesToday, totalNewDeathsToday,
        totalActiveCases, totalSeriousCases, totalAffectedCountries} = globalStat;

    const sql =
        `INSERT INTO GlobalStat (totalCases, totalRecovered, totalUnresolved, totalDeaths, totalNewCasesToday, totalNewDeathsToday, totalActiveCases, totalSeriousCases, totalAffectedCountries) 
        VALUES ('${totalCases}', '${totalRecovered}', '${totalUnresolved}', '${totalDeaths}', '${totalNewCasesToday}', '${totalNewDeathsToday}', '${totalActiveCases}', '${totalSeriousCases}', '${totalAffectedCountries}')`;
    return changeData(sql);
};

exports.getGlobalStat = function () {

    const sql =
            `SELECT G.totalCases, G.totalRecovered, G.totalUnresolved, G.totalDeaths, G.totalNewCasesToday, G.totalNewDeathsToday, G.totalActiveCases, G.totalSeriousCases, G.totalAffectedCountries FROM GlobalStat as G`;
        return selectData(sql, true);

};
