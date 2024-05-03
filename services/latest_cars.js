import { buildUrl } from '../utils/urlBuilder';
import { scrapeLast10 } from '../utils/scraper';

export async function getLatest10(km, fromYear, toYear, fromPrice, toPrice, url) {
    try {
        const builtUrl = buildUrl(km, fromYear, toYear, fromPrice, toPrice, url);
        const last10Cars = await scrapeLast10(builtUrl);
        return last10Cars;

    } catch (error) {
        throw error;
    }
}