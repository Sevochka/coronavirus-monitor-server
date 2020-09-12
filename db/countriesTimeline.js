const {selectData, changeData} = require('sqlite3-simple-api');

const createCountriesTimeline =
    `CREATE TABLE IF NOT EXISTS 'CountriesTimeline' (
    'code' TEXT NOT NULL PRIMARY KEY UNIQUE,
    'timeline' TEXT NOT NULL
    );`;

changeData(createCountriesTimeline);

exports.getCountryTimeline = function (code) {
    const sql =
        `SELECT CountriesTimeline.timeline FROM CountriesTimeline WHERE code = '${code.toUpperCase()}'`;
    return selectData(sql);
};

exports.updateCountriesTimeline = function (key, countryTimeline) {
    const sql =
        `INSERT OR REPLACE INTO CountriesTimeline (code, timeline)
        VALUES ('${key}', '${countryTimeline}')`;
    return changeData(sql);
};