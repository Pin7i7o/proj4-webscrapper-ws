const router = require('express').Router();
const scrapRouter = require('./scrap');
const carsRouter = require('./cars');
const responsesRouter = require('./responses');

router.use('/scrap', scrapRouter);
router.use('/cars', carsRouter);
router.use('/responses', responsesRouter);

module.exports = router;