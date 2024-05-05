const services = require('../services/latest_cars');

//return the 10 most recently posted cars w/o filters
exports.getLatestCars = async (req, res) => {
    const { km, fromYear, toYear, fromPrice, toPrice, url } = req.query;
    const params = await services.getLatest10(km, fromYear, toYear, fromPrice, toPrice, url);
    res.json(params);

}
