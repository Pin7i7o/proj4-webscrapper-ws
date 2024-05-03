import { getLatestCars } from '../controllers/latest_cars';
const latestCarsRoute = require('express').Router();

latestCarsRoute.get('/last-10-cars', getLatestCars);

export default latestCarsRoute;