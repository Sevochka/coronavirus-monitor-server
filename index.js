const express = require("express");
const path = require('path');
const coronaRoutes = require('./routes/corona');
const data = require('./middlewares/data-api');
const app = express();
const PORT = process.env.PORT || 4000;

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const timeout = async (func) => {
    console.log("Обновление");
    const flag = await func();
    if (flag) {
        console.log("Отсчет начат");
        await sleep(24*60*60*1000);
        timeout(data);
    } else {
        console.log("Перезагрузка начата");
        await sleep(10000);
        timeout(data)
    }
};

timeout(data);

