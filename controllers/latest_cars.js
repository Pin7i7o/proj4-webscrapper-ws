import { getLatest10 } from '../services/latest_cars';

export async function getLatestCars(req, res) {
    try {
        const { km, fromYear, toYear, fromPrice, toPrice, url } = req.query;
        const params = await getLatest10(km, fromYear, toYear, fromPrice, toPrice, url);
        res.json(params);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
