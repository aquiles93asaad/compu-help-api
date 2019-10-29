const express = require('express');

const authRoutes = require('./auth.route');
const computerRoutes = require('./computer.route');
const notificacionRoutes = require('./notificacion.route');
const questionRoutes = require('./question.route');
const usageProfileRoutes = require('./usage-profile.route');
const userRoutes = require('./user.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/computer', computerRoutes);
router.use('/notificacion', notificacionRoutes);
router.use('/question', questionRoutes);
router.use('/usage-profile', usageProfileRoutes);
router.use('/user', userRoutes);

module.exports = router;
