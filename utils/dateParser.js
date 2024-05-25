const axios = require('axios');
const cheerio = require('cheerio');


exports.getPublishedDate = async (url) => {
    try {
        const { data: detailHtml } = await axios.get(url);
        const $ = cheerio.load(detailHtml);

        let published_date = $('[data-testid="action-area"] > div > p:first').text();
        const parsedDate = parseDate(published_date);

        return parsedDate;
    } catch (error) {
        console.error(`Error fetching published date for ${url}:`, error);
        return null;
    }
};

const parseDate = (dateStr) => {
    const date = dateStr.split(' ');
    
    const day = parseInt(date[0]);
    const month = monthToNumber(date[2]);
    const year = parseInt(date[4]);

    const time = date[6].split(':');

    const hour = parseInt(time[0]);
    const minutes = parseInt(time[1]);
    
    return new Date(year, month, day, hour, minutes);
  }


const monthToNumber = (month) => {
    const months = new Map();

    months.set('janeiro', 1);
    months.set('fevereiro', 2);
    months.set('março', 3);
    months.set('abril', 4);
    months.set('maio', 5);
    months.set('junho', 6);
    months.set('julho', 7);
    months.set('agosto', 8);
    months.set('setembro', 9);
    months.set('outubro', 10);
    months.set('novembro', 11);
    months.set('dezembro', 12);

    return months.get(month);
  }