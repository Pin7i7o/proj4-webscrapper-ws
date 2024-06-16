const route = require('express').Router();
const controller = require('../controllers/auth');

route.post('/signin', controller.signin); //Sign In
route.post('/signup', controller.signup); //Sign Up
route.get('/get-all', controller.getAllUsers); //Gets All Users
route.put('/change-password', controller.changePassword); //Changes pasword
route.put('/update-visibility', controller.updateVisibility); //Blocks/Unblocks user
route.put('/update-permissions', controller.updatePermissions); //Adds/Removes admin perms 

module.exports = route;