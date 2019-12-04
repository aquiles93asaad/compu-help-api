const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const searchHisroryCtrl = require('../controllers/search-history.controller');
const requireAuth = require('../middleware/require-auth');

router.use(requireAuth);

router.route('').post(asyncHandler(create));
router.route('/:id').delete(asyncHandler(remove));

module.exports = router;

async function create(req, res) {
    const searchHisrory = await searchHisroryCtrl.create(req.body.searchHisrory);
    res.json({ searchHisrory });
}

async function remove(req, res) {
    if(!req.params.id) {
        res.status(400);
        res.json({ error: "id param is mandatory"})
    }
    const searchHisrory = await searchHisroryCtrl.update(req.params.id);
    res.json({ searchHisrory });
}
