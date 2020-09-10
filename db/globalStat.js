const {selectData, changeData} = require('sqlite3-simple-api');

const id = 1;
const createGroupTable =
    `CREATE TABLE IF NOT EXISTS 'GlobalStats' (
    'id' INTEGER NOT NULL PRIMARY KEY UNIQUE,
    'totalCases' INTEGER NOT NULL,
    'totalRecovered' INTEGER,
    'totalUnresolved' INTEGER NOT NULL,
    'totalDeaths' INTEGER NOT NULL,
    'totalNewCasesToday' INTEGER NOT NULL,
    'totalNewDeathsToday' INTEGER NOT NULL,
    'totalActiveCases' INTEGER NOT NULL,
    'totalSeriousCases' INTEGER NOT NULL,
    'totalAffectedCountries' INTEGER NOT NULL
    );`;
changeData(createGroupTable);

exports.getGlobalStat = function () {
    const sql =
        `SELECT G.totalCases, G.totalRecovered, G.totalUnresolved, G.totalDeaths, G.totalNewCasesToday, 
            G.totalNewDeathsToday, G.totalActiveCases, G.totalSeriousCases, G.totalAffectedCountries FROM GlobalStats as G`;
    return selectData(sql, true);
};

exports.updateGlobalStat = async function (globalStat) {
    const {
        totalCases, totalRecovered, totalUnresolved, totalDeaths, totalNewCasesToday, totalNewDeathsToday,
        totalActiveCases, totalSeriousCases, totalAffectedCountries
    } = globalStat;

    const sql =
        `INSERT OR REPLACE INTO GlobalStats (id, totalCases, totalRecovered, totalUnresolved, totalDeaths, 
        totalNewCasesToday, totalNewDeathsToday, totalActiveCases, totalSeriousCases, totalAffectedCountries) 
        VALUES ('${id}', '${totalCases}', '${totalRecovered}', '${totalUnresolved}', '${totalDeaths}', 
        '${totalNewCasesToday}', '${totalNewDeathsToday}', '${totalActiveCases}', '${totalSeriousCases}', '${totalAffectedCountries}')`;

    return changeData(sql);
};
