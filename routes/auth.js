const route = require('express').Router();
const controller = require('../controllers/auth');

route.post('/signin', controller.signin); //Sign In
route.post('/signup', controller.signup); //Sign Up

module.exports = route;