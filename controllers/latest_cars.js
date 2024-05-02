const latestCarsService = require('../services/latest_cars');

exports.getLatestCars = async (req, res) => {
    try {
        const latestCars = await latestCarsService.getLatest10();
        res.json(latestCars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

