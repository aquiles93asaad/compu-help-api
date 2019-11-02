const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const computerCtrl = require('../controllers/computer.controller');
const requireAuth = require('../middleware/require-auth');

router.use(requireAuth);

router.route('').post(asyncHandler(create));
router.route('/:id').get(asyncHandler(get));
router.route('').put(asyncHandler(update));
//router.route('/:id').post(asyncHandler(remove));

module.exports = router;

async function create(req, res) {
    const computer = await computerCtrl.create(req.body.computer);
    res.json({ computer });
}

async function get(req, res) {
    console.log(req.params);
    if(!req.params.id) {
        res.status(400);
        res.json({ error: "id param is mandatory"})
    }
    console.log("Valor: " + req.params.id);
    const computers = await computerCtrl.get(req.params.id);
    res.json({ computers });
}

async function search(req, res) {
    let filters;
    (typeof req.body.filters === 'undefined') ? filters = {} : filters = req.body.filters;
    const computers = await computerCtrl.get(req.user, filters);
    res.json({ computers });
}

async function update(req, res) {
    const computer = await computerCtrl.update(req.body.computer);
    res.json({ computer });
}

async function remove(req, res) {
    const computer = await computerCtrl.update(req.body.computer);
    res.json({ computer });
}