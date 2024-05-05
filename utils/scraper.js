const axios = require('axios');
const cheerio = require('cheerio');

exports.scrapeLast10 = async (url) => {
    try{
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        let last10Cars = [];

        const cars = $('[data-testid="search-results"] section.ooa-10gfd0w.e1i3khom1');
        let count = 0;
        cars.each((i, car) => {
            if (count == 10) return;
            const data = {
                modelMake: $(car).find('h1.e1i3khom9.ooa-1ed90th.er34gjf0 > a').text(),
                km: $(car).find('[data-parameter="mileage"]').text(),
                year: $(car).find('[data-parameter="first_registration_year"]').text(),
                price: $(car).find('h3.e1i3khom16.ooa-1n2paoq.er34gjf0').text(),
                url: $(car).find('h1.e1i3khom9.ooa-1ed90th.er34gjf0 > a').attr('href')
            };

            last10Cars.push(data);
            count++;
        });

        return last10Cars;
    } catch (error) {
        throw error;
    };
}