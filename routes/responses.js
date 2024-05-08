const route = require('express').Router();
const controller = require('../controllers/responses');

route.get('/get-id/:scrapId', controller.getById); //Responses for specific car
route.post('/create', controller.create); //Create new responses

module.exports = route;