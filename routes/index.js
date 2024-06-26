const router = require('express').Router();
const scrapRouter = require('./scrap');
const carsRouter = require('./cars');
const responsesRouter = require('./responses');
const authRouter = require('./auth');
const usersRouter = require('./users');

router.use('/scrap', scrapRouter); //Scraping Routes
router.use('/cars', carsRouter); //Cars Routes
router.use('/responses', responsesRouter); //Responses Routes
router.use('/auth', authRouter); // Authentication Routes
router.use('/users', usersRouter); // Users Routes

module.exports = router;