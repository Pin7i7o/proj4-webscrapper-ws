const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.standvirtual.com/carros?search%5Bfilter_enum_fuel_type%5D=electric&search%5Border%5D=created_at_first%3Adesc';

const electric_cars = {};

async function getHtml() {
    const { data: html } = await axios.get(url);
    return html;
}

getHtml().then((res) => {
    const $ = cheerio.load(res);
    $('[data-testid="search-results"] section.ooa-10gfd0w.e1i3khom1').each((i, car) => {
        const make_model = $(car).find('h1.e1i3khom9.ooa-1ed90th.er34gjf0 > a').text();
        const km = $(car).find('[data-parameter="mileage"]').text();
        electric_cars[make_model] = km;
    });
    fs.writeFile('cars.json', JSON.stringify(electric_cars), (err) => {
        if (err) throw err;
        console.log('file successfully saved');
    })
});
