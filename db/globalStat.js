const {selectData, changeData} = require('sqlite3-simple-api');

const createGroupTable =
    `CREATE TABLE IF NOT EXISTS 'GlobalStats' (
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
    const {totalCases, totalRecovered, totalUnresolved, totalDeaths, totalNewCasesToday, totalNewDeathsToday,
        totalActiveCases, totalSeriousCases, totalAffectedCountries} = globalStat;

    const check = await selectData('SELECT * FROM GlobalStats');

    let sql;
    if (!check.length){
        sql =
            `INSERT INTO GlobalStats (totalCases, totalRecovered, totalUnresolved, totalDeaths, 
        totalNewCasesToday, totalNewDeathsToday, totalActiveCases, totalSeriousCases, totalAffectedCountries) 
        VALUES ('${totalCases}', '${totalRecovered}', '${totalUnresolved}', '${totalDeaths}', 
        '${totalNewCasesToday}', '${totalNewDeathsToday}', '${totalActiveCases}', '${totalSeriousCases}', '${totalAffectedCountries}')`;
    } else {
        sql =
            `UPDATE GlobalStats SET totalCases = ${totalCases}, totalRecovered = ${totalRecovered}, 
        totalUnresolved = ${totalUnresolved}, totalDeaths = ${totalDeaths}, 
        totalNewCasesToday = ${totalNewCasesToday}, totalNewDeathsToday = ${totalNewDeathsToday}, 
        totalActiveCases = ${totalActiveCases}, totalSeriousCases = ${totalSeriousCases}, totalAffectedCountries = ${totalAffectedCountries}`;
    }


    return changeData(sql);
};
