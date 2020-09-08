const express = require("express");
const path = require('path');
const coronaRoutes = require('./routes/corona');
const data = require('./middlewares/data-api');
const app = express();
const PORT = process.env.PORT || 4000;

const globalStat = require("./db/globalStat");

// globalStat.getGlobalStat().then((res)=> {
//     console.log(res);
// });

data();



(function () {
    Object.prototype.renameProperty = function (oldName, newName) {
        if (oldName === newName) {
            return this;
        }

        if (this.hasOwnProperty(oldName)) {
            this[newName] = this[oldName];
            delete this[oldName];
        }
        return this;
    };

    Object.prototype.renamePropertiesToCamel = function () {
        return Object.keys(this).map((key) => {
            return this.renameProperty(key, key.toCamel());
        });
    };

    String.prototype.toCamel = function () {
        return this.replace(/([-_][a-z])/ig, ($1) => {
            return $1.toUpperCase()
                .replace('-', '')
                .replace('_', '');
        });
    };
})();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    next();
});


app.use('/api', coronaRoutes);

app.listen(PORT);



