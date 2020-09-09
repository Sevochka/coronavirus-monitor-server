const { Router } = require('express');
const router = Router();

const countryModel = require('../db/countryTotals');
const globalStat = require('../db/globalStat');

router.get('/global-stats', async (req, res) => {
    const globalStat = await globalStat.getGlobalStat();
    await res.json(globalStat);
});
router.get('/country-totals', async (req, res) => {
    const countryTotals = await countryModel.getAllTotals();
    await res.json(countryTotals);
});
router.get('/country-totals/:code', async (req, res) => {
    const code = req.params.code;
    const countryTotals = await countryModel.getCountryTotals(code);
    await res.json(countryTotals);
});

module.exports = router;