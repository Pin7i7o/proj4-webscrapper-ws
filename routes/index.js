const router = require('express').Router();
const scrapRouter = require('./scrap');
const carsRouter = require('./cars');

router.use('/scrap', scrapRouter);
router.use('/cars', carsRouter);

module.exports = router;