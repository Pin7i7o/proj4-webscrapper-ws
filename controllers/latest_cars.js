const services = require('../services/latest_cars');

exports.getLatestCars = async (req, res) => {
    const { km, fromYear, toYear, fromPrice, toPrice, url } = req.query;
    const params = await services.getLatest10(km, fromYear, toYear, fromPrice, toPrice, url);
    res.json(params);

}
