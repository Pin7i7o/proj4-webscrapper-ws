const route = require('express').Router();
const controller = require('../controllers/responses');


route.post('/add-responses', controller.postResponses); //Create new responses

module.exports = route;