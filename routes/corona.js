const { Router } = require('express');
const router = Router();

router.get('/global-stats', (req, res) => {
    res.json(req.globalStats);
});

module.exports = router;