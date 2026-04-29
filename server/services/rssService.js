const Parser = require('rss-parser');
const parser = new Parser();

async function fetchRssArticles() {
    const feed = await parser.parseURL('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');

    const articles = feed.items.map(item => ({
        title: item.title,
        link: item.link,
        publishedAt: item.pubDate,
        source: feed.title,
        description: item.contentSnippet || '',
        type: 'rss'
    }));

    return articles;
}

module.exports = {
    fetchRssArticles
};