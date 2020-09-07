const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json(req.globalStat);
});


module.exports = router;