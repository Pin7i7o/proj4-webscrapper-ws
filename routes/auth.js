const route = require('express').Router();
const controller = require('../controllers/auth');

route.post('/signin', controller.getById); //Sign In
route.post('/signout', controller.create); //Sign Out

module.exports = route;