const urlBuilder = require('../utils/urlBuilder');
const scraper = require('../utils/scraper');

//return the 10 most recently posted cars w/o filters
exports.getLatest10 = async (km, fromYear, toYear, fromPrice, toPrice, url) => {
    try {
        const builtUrl = urlBuilder.buildUrl(km, fromYear, toYear, fromPrice, toPrice, url);
        const last10Cars = await scraper.scrapeLast10(builtUrl);
        return last10Cars;

    } catch (error) {
        throw error;
    }
}