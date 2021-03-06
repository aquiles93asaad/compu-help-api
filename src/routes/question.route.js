const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const questionCtrl = require('../controllers/question.controller');
const requireAuth = require('../middleware/require-auth');

router.use(requireAuth);

router.route('').post(asyncHandler(create));
router.route('/:id').get(asyncHandler(get));
router.route('').put(asyncHandler(update));
router.route('/search').post(asyncHandler(search));

module.exports = router;

async function create(req, res) {
    const question = await questionCtrl.create(req.body.question);
    res.json({ question });
}

async function get(req, res) {
    if(!req.params.id) {
        res.status(400);
        res.json({ error: "id param is mandatory"})
    }
    const questions = await questionCtrl.get(req.params.id);
    res.json({ questions });
}

async function search(req, res) {
    let filters;
    (typeof req.body.filters === 'undefined') ? filters = {} : filters = req.body.filters;
    const questions = await questionCtrl.get(req.user, filters);
    res.json({ questions });
}

async function update(req, res) {
    req.body.company['modifiedAt'] = new Date();
    req.body.company['modifiedBy'] = req.user._id;
    const question = await questionCtrl.update(req.body.question);
    res.json({ question });
}

// async function remove(req, res) {
//     const question = await questionCtrl.update(req.body.question);
//     res.json({ question });
// }

async function search(req, res) {
    let filters;
    (typeof req.body.filters === 'undefined') ? filters = {} : filters = req.body.filters;
    const questions = await questionCtrl.search(filters);
    res.json({ questions });
}