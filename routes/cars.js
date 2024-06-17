const route = require('express').Router();
const controller = require('../controllers/cars');
const authMiddleware = require('../middlewares/auth');

route.use(authMiddleware);

route.get('/get-all', controller.getAll); //Gets all cars for a specific user
route.post('/create', controller.create); //Create new car
route.put('/update', controller.update); //Update car

module.exports = route;