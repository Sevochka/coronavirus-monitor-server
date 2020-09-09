const {selectData, changeData} = require('sqlite3-simple-api');

const createCountryTotalsTable =
    `CREATE TABLE IF NOT EXISTS 'CountryTotals' (
    'code' TEXT NOT NULL PRIMARY KEY UNIQUE,
    'title' TEXT NOT NULL, 
    'totalCases' INTEGER NOT NULL,
    'totalRecovered' INTEGER NOT NULL,
    'totalUnresolved' INTEGER NOT NULL,
    'totalDeaths' INTEGER NOT NULL,
    'totalNewCasesToday' INTEGER NOT NULL,
    'totalNewDeathsToday' INTEGER NOT NULL,
    'totalActiveCases' INTEGER NOT NULL,
    'totalSeriousCases' INTEGER NOT NULL
    );`;
changeData(createCountryTotalsTable);

exports.getAllTotals = function () {
    const sql =
        `SELECT * FROM CountryTotals`;
    return selectData(sql);
};

exports.getCountryTotals = function (code) {
    const sql =
        `SELECT * FROM CountryTotals WHERE code = '${code.toUpperCase()}'`;
    return selectData(sql);
};

exports.updateCountryTotals = function (countryStat) {
    const {
        code, title, totalCases, totalRecovered, totalUnresolved, totalDeaths, totalNewCasesToday, totalNewDeathsToday,
        totalActiveCases, totalSeriousCases
    } = countryStat;
    const sql =
        `INSERT OR REPLACE INTO CountryTotals (code, title, totalCases, totalRecovered, totalUnresolved, totalDeaths,
        totalNewCasesToday, totalNewDeathsToday, totalActiveCases, totalSeriousCases)
        VALUES ('${code}', '${title}', '${totalCases}', '${totalRecovered}', '${totalUnresolved}', '${totalDeaths}',
        '${totalNewCasesToday}', '${totalNewDeathsToday}', '${totalActiveCases}', '${totalSeriousCases}')`;

    return changeData(sql);
};
