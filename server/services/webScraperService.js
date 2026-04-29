const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeBasicPage(url) {
    if (!url) {
        throw new Error('URL is required');
    }

    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const title = $('title').text().trim();

    const headings = [];

    $('h1, h2').each((index, element) => {
        headings.push($(element).text().trim());
    });

    return {
        sourceUrl: url,
        title,
        headings,
        type: 'web_scrape'
    };
}

module.exports = {
    scrapeBasicPage
};