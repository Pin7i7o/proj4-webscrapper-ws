const cheerio = require('cheerio');
const playwright = require('playwright');
const fs = require('fs');


const url = 'https://www.standvirtual.com/carros?search%5Bfilter_enum_fuel_type%5D=electric&search%5Border%5D=created_at_first%3Adesc';

const first_10_cars = [];

async function getHtml() {
    try {
        const browser = await playwright.chromium.launch(); // Launch the browser
        const context = await browser.newContext(); // Create a new context
        const page = await context.newPage(); // Create a new page
        await page.goto(url); // Navigate to the provided URL
        const html = await page.content(); // Get the page content
        //const { data: html } = await axios.get(url);
        return html;
    } catch (error) {
        throw error;
    }
}

getHtml()
    .then((res) => {
        const $ = cheerio.load(res);
        const cars = $('[data-testid="search-results"] section.ooa-10gfd0w.e1i3khom1');
        let count = 0;
        cars.each((i, car) => {
            if (count == 10) return;
            const data = {
                model_make: $(car).find('h1.e1i3khom9.ooa-1ed90th.er34gjf0 > a').text(),
                km: $(car).find('[data-parameter="mileage"]').text(),
                year: $(car).find('[data-parameter="first_registration_year"]').text(),
                price: $(car).find('h3.e1i3khom16.ooa-1n2paoq.er34gjf0').text(),
                url: $(car).find('h1.e1i3khom9.ooa-1ed90th.er34gjf0 > a').attr('href')
            };

            first_10_cars.push(data);
            count++;
        });

        const jsonData = JSON.stringify(first_10_cars);
        fs.writeFile('cars.json', jsonData, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    })
    .catch((error) => {
        console.error('Error fetching HTML:', error);
    });