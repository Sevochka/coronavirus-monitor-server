const {selectData, changeData} = require('sqlite3-simple-api');

const createGlobalStatsTable =
    `CREATE TABLE IF NOT EXISTS 'GlobalStats' (
    'id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    'totalCases' TEXT NOT NULL,
    'totalRecovered' TEXT NOT NULL,
    'totalUnresolved' TEXT NOT NULL,
    'totalDeaths' TEXT NOT NULL,
    'totalNewCasesToday' TEXT NOT NULL,
    'totalNewDeathsToday' TEXT NOT NULL,
    'totalActiveCases' TEXT NOT NULL,
    'totalSeriousCases' TEXT NOT NULL,
    'totalAffectedCountries' TEXT NOT NULL
    );`;
changeData(createGlobalStatsTable);

exports.addGlobalStats = async function (globalStat) {

    const {totalCases, totalRecovered, totalUnresolved, totalDeaths, totalNewCasesToday, totalNewDeathsToday,
        totalActiveCases, totalSeriousCases, totalAffectedCountries} = globalStat;

    const sql =
        `INSERT INTO GlobalStats (totalCases, totalRecovered, totalUnresolved,totalDeaths, totalNewCasesToday, totalNewDeathsToday, totalActiveCases, totalSeriousCases, totalAffectedCountries)
        VALUES (
        '${1}', '${2}', 
        '${3}', '${4}', 
        '${5}', '${6}'
        '${7}', '${8}', 
        '${0}'
        )`;
    return changeData(sql);
};