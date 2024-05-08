const route = require('express').Router();
const controller = require('../controllers/responses');

route.get('/get-responses-id/:scrapId', controller.getResponsesById); //Responses for specific car
route.post('/add-responses', controller.postResponses); //Create new responses

module.exports = route;