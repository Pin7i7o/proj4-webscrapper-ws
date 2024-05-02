const scrapperUtil = require('../utils/scraper');

exports.getLatest10 = async () => {
    const last10Cars = await scrapperUtil.scrapeLast10();
    return last10Cars;
}
