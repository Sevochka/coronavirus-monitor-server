const { Router } = require('express');
const router = Router();

const countryModel = require('../db/countryTotals');
const globalStat = require('../db/globalStat');
const countriesTimeline = require('../db/countriesTimeline');

router.get('/global-stats', async (req, res) => {
    await res.json(await globalStat.getGlobalStat());
});
router.get('/country-totals', async (req, res) => {
    const countryTotals = await countryModel.getAllTotals();
    await res.json(countryTotals);
});
router.get('/country-totals/:code', async (req, res) => {
    const code = req.params.code;
    const [countryTotals] = await countryModel.getCountryTotals(code);
    await res.json(countryTotals);
});

router.get('/country-timeline/:code', async (req, res) => {
    const code = req.params.code;
    let [countryTimeline] = await countriesTimeline.getCountryTimeline(code);
    await res.send(countryTimeline.timeline);
});

module.exports = router;