const axios = require('axios');
const cheerio = require('cheerio');

exports.scrapeLast10 = async (url) => {
    try {
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        let last10Cars = [];

        const cars = $('main > div > div > div > div > div > article > section');

        const carPromises = cars.map((i, car) => {
            return (async () => {
                if (last10Cars.length >= 10) return;

                const modelMake = $(car).find('div > h1 > a:first').text();
                const km = $(car).find('[data-parameter="mileage"]').text();
                const year = $(car).find('[data-parameter="first_registration_year"]').text();
                const price = $(car).find('h3:first').text();
                const url = $(car).find('div > h1 > a:first').attr('href');
                const published = await getPublishedDate(url);

                const data = {
                    modelMake,
                    km,
                    year,
                    price,
                    url,
                    published
                };

                last10Cars.push(data);
            })();
        }).get();

        await Promise.all(carPromises);
        return last10Cars;
    } catch (error) {
        console.error('Error in scrapeLast10:', error);
        throw error;
    }
};

const getPublishedDate = async (url) => {
    try {
        const { data: detailHtml } = await axios.get(url);
        const $ = cheerio.load(detailHtml);

        let published = $('[data-testid="action-area"] > div > p:first').text();
        return published;
    } catch (error) {
        console.error(`Error fetching published date for ${url}:`, error);
        return null; 
    }
};
