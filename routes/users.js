const route = require('express').Router();
const controller = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

route.use(authMiddleware);

route.get('/get-all', controller.getAllUsers); //Gets All Users
route.get('/get-user/:id', controller.getUserById); //Gets a User by Id
route.put('/update-visibility', controller.updateVisibility); //Blocks/Unblocks User
route.put('/update-permissions', controller.updatePermissions); //Adds/Removes Admin Perms 

module.exports = route;