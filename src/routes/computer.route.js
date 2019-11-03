const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const computerCtrl = require('../controllers/computer.controller');
const requireAuth = require('../middleware/require-auth');

router.use(requireAuth);

router.route('').post(asyncHandler(create));
router.route('/search').get(asyncHandler(search));
router.route('/:id').get(asyncHandler(get));
router.route('').put(asyncHandler(update));
router.route('/search-by-score').post(asyncHandler(searchByScore));
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
    const computers = await computerCtrl.search();
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

async function searchByScore(req, res) {
    const answers = req.body.answers;
    var filters = {
        "processorMinScore": 0,
        "processorMaxScore": 0,
        "ramMinScore": 0,
        "ramMaxScore": 0,
        "storageMinScore": 0,
        "storageMaxScore": 0,
        "graphicsCardMinScore": 0,
        "graphicsCardMaxScore": 0
    };
    for(var i = 0;i < answers.length; i++) {
        filters = await updateFilters(filters, answers[i]);
    }
    //const computers = await computerCtrl.searchByScore(filters);
    // res.json({computers});
    res.json({filters});
}

function updateFilters(filters, answer) {
    if (answer.processorMinScore > filters.processorMinScore)
        filters.processorMinScore = answer.processorMinScore
    if (answer.processorMaxScore > filters.processorMaxScore)
        filters.processorMaxScore = answer.processorMaxScore
    if (answer.ramMinScore > filters.ramMinScore)
        filters.ramMinScore = answer.ramMinScore
    if (answer.ramMaxScore > filters.ramMaxScore)
        filters.ramMaxScore = answer.ramMaxScore
    if (answer.storageMinScore > filters.storageMinScore)
        filters.storageMinScore = answer.storageMinScore
    if (answer.storageMaxScore > filters.storageMaxScore)
        filters.storageMaxScore = answer.storageMaxScore
    if (answer.graphicsCardMinScore > filters.graphicsCardMinScore)
        filters.graphicsCardMinScore = answer.graphicsCardMinScore
    if (answer.graphicsCardMaxScore > filters.graphicsCardMaxScore)
        filters.graphicsCardMaxScore = answer.graphicsCardMaxScore
    // const fieldNames = Object.keys(filters);
    // console.log(fieldNames);
    // console.log(filters);
    // for(var i = 0; i < fieldNames.length; i++) {
    //     if (answer.[`fieldNames[i]`] > filters.fields[fieldNames[i]].value)
    //         filters.fields[fieldNames[i]].value = answer.fields[fieldNames[i]].value;
    // }
    return filters;
}