const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const usagePorfileCtrl = require('../controllers/usage-profile.controller');
const requireAuth = require('../middleware/require-auth');

router.use(requireAuth);

router.route('').post(asyncHandler(create));
router.route('/:id').get(asyncHandler(get));
router.route('').put(asyncHandler(update));
//router.route('/:id').post(asyncHandler(remove));

module.exports = router;

async function create(req, res) {
    const usagePorfile = await usagePorfileCtrl.create(req.body.usagePorfile);
    res.json({ usagePorfile });
}

async function get(req, res) {
    console.log(req.params);
    if(!req.params.id) {
        res.status(400);
        res.json({ error: "id param is mandatory"})
    }
    const usagePorfiles = await usagePorfileCtrl.get(req.user, filters);
    res.json({ usagePorfiles });
}

async function search(req, res) {
    let filters;
    (typeof req.body.filters === 'undefined') ? filters = {} : filters = req.body.filters;
    const usagePorfiles = await usagePorfileCtrl.get(req.user, filters);
    res.json({ usagePorfiles });
}

async function update(req, res) {
    const usagePorfile = await usagePorfileCtrl.update(req.body.usagePorfile);
    res.json({ usagePorfile });
}

async function remove(req, res) {
    const usagePorfile = await usagePorfileCtrl.update(req.body.usagePorfile);
    res.json({ usagePorfile });
}