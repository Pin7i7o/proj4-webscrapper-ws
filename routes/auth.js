const route = require('express').Router();
const controller = require('../controllers/auth');

route.post('/signin', controller.signin); //Sign In
route.post('/signup', controller.signup); //Sign Up
route.get('/get-all', controller.getAllUsers); //Gets All Users
route.get('/get-user/:id', controller.getUserById); //Gets a User by Id
route.put('/change-password', controller.changePassword); //Changes Password
route.put('/update-visibility', controller.updateVisibility); //Blocks/Unblocks User
route.put('/update-permissions', controller.updatePermissions); //Adds/Removes Admin Perms 

module.exports = route;