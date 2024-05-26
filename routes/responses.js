const route = require('express').Router();
const controller = require('../controllers/responses');

route.get('/get-id/:scrapId', controller.getById); //Responses for specific car
route.post('/create', controller.create); //Create new responses
route.delete('/delete/:id', controller.delete); //Deletes responses by scrap id

module.exports = route;