const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const questionCtrl = require('../controllers/question.controller');
const requireAuth = require('../middleware/require-auth');

router.use(requireAuth);

router.route('').post(asyncHandler(create));
router.route('/:id').get(asyncHandler(get));
router.route('').put(asyncHandler(update));
//router.route('/:id').post(asyncHandler(remove));

module.exports = router;

async function create(req, res) {
    const question = await questionCtrl.create(req.body.question);
    res.json({ question });
}

async function get(req, res) {
    console.log(req.params);
    if(!req.params.id) {
        res.status(400);
        res.json({ error: "id param is mandatory"})
    }
    const questions = await questionCtrl.get(req.user, filters);
    res.json({ questions });
}

async function search(req, res) {
    let filters;
    (typeof req.body.filters === 'undefined') ? filters = {} : filters = req.body.filters;
    const questions = await questionCtrl.get(req.user, filters);
    res.json({ questions });
}

async function update(req, res) {
    const question = await questionCtrl.update(req.body.question);
    res.json({ question });
}

async function remove(req, res) {
    const question = await questionCtrl.update(req.body.question);
    res.json({ question });
}