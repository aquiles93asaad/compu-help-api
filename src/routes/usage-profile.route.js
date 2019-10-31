const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const usageProfileCtrl = require('../controllers/usage-profile.controller');
const requireAuth = require('../middleware/require-auth');

router.use(requireAuth);

router.route('').post(asyncHandler(create));
router.route('/:id').get(asyncHandler(get));
router.route('').put(asyncHandler(update));
router.route('/search').post(asyncHandler(search));

module.exports = router;

async function create(req, res) {
    const usageProfile = await usageProfileCtrl.create(req.body.usageProfile);
    res.json({ usageProfile });
}

async function get(req, res) {
    if(!req.params.id) {
        res.status(400);
        res.json({ error: "id param is mandatory"})
    }
    const usageProfiles = await usageProfileCtrl.get(req.params.id);
    res.json({ usageProfiles });
}

async function search(req, res) {
    let filters;
    (typeof req.body.filters === 'undefined') ? filters = {} : filters = req.body.filters;
    const usageProfiles = await usageProfileCtrl.search(filters);
    res.json({ usageProfiles });
}

async function update(req, res) {
    const usageProfile = await usageProfileCtrl.update(req.body.usageProfile);
    res.json({ usageProfile });
}

async function remove(req, res) {
    const usageProfile = await usageProfileCtrl.update(req.body.usageProfile);
    res.json({ usageProfile });
}