const route = require('express').Router();
const controller = require('../controllers/auth');

route.post('/signin', controller.signin); //Sign In
route.post('/signup', controller.signup); //Sign Up
route.get('/get-all', controller.getAllUsers); //Gets All Users
route.put('/change-password', controller.changePassword); //Changes pasword

module.exports = route;