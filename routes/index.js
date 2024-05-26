const router = require('express').Router();
const scrapRouter = require('./scrap');
const carsRouter = require('./cars');
const responsesRouter = require('./responses');

router.use('/scrap', scrapRouter); //Scraping Routes
router.use('/cars', carsRouter); //Cars Routes
router.use('/responses', responsesRouter); //Responses Routes

module.exports = router;