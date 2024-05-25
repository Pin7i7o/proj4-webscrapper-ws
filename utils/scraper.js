const axios = require('axios');
const cheerio = require('cheerio');
const dateParser = require('../utils/dateParser');

//Gets the 10 most recently posted cars from an url
exports.scrapeLast10 = async (url) => {
    try {
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        const last10Cars = [];
        const cars = $('main > div > div > div > div > div > article > section');

        for (let i = 0; i < cars.length && last10Cars.length < 10; i++) {
            const car = cars[i];

            const model_make = $(car).find('div > h1 > a:first').text();
            const km = $(car).find('[data-parameter="mileage"]').text();
            const year = $(car).find('[data-parameter="first_registration_year"]').text();
            const price = $(car).find('h3:first').text();
            const carUrl = $(car).find('div > h1 > a:first').attr('href');
            const published_date = await dateParser.getPublishedDate(carUrl);

            const data = {
                model_make,
                km,
                year,
                price,
                url: carUrl,
                published_date
            };

            last10Cars.push(data);
        }

        return last10Cars;
    } catch (error) {
        console.error('Error in scrapeLast10:', error);
        throw error;
    }
}; 

