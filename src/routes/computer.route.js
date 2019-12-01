const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const computerCtrl = require('../controllers/computer.controller');
const requireAuth = require('../middleware/require-auth');

router.use(requireAuth);

router.route('').post(asyncHandler(create));
router.route('/:id').get(asyncHandler(get));
router.route('').put(asyncHandler(update));
router.route('/search').post(asyncHandler(search));
router.route('/addComment').post(asyncHandler(addComment));
router.route('/search-by-score').post(asyncHandler(searchByScore));
//router.route('/:id').post(asyncHandler(remove));

module.exports = router;

async function create(req, res) {
    const computer = await computerCtrl.create(req.body.computer);
    res.json({ computer });
}

async function get(req, res) {
    if(!req.params.id) {
        res.status(400);
        res.json({ error: "id param is mandatory"})
    }
    const computer = await computerCtrl.get(req.params.id);
    res.json({ computer });
}

async function search(req, res) {
    console.log(req.body.filers);
    let filters;
    (typeof req.body.filters === 'undefined') ? filters = {} : filters = req.body.filters;
    const computers = await computerCtrl.search(filters);
    res.json({ computers });
}

async function update(req, res) {
    req.body.company['modifiedAt'] = new Date();
    req.body.company['modifiedBy'] = req.user._id;
    const computer = await computerCtrl.update(req.body.computer);
    res.json({ computer });
}

async function addComment(req, res) {
    const computer = await computerCtrl.addComment(req.body.comment, req.body.computerId);
    res.json({ computer });
}

async function searchByScore(req, res) {
    console.log(req.body);
    const computers = await computerCtrl.searchByScore(req.body.answers);
    res.json({computers});
}

// async function remove(req, res) {
//     const computer = await computerCtrl.update(req.body.computer);
//     res.json({ computer });
// }