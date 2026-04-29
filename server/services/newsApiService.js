const axios = require('axios');

async function fetchNewsApiArticles(query) {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
        throw new Error('NEWS_API_KEY is missing');
    }

    if (!query) {
        throw new Error('Search query is required');
    }

    const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
            q: query,
            language: 'en',
            pageSize: 10,
            sortBy: 'publishedAt',
            apiKey
        }
    });

    const articles = response.data.articles.map(item => ({
        title: item.title,
        link: item.url,
        publishedAt: item.publishedAt,
        source: item.source?.name || 'Unknown',
        description: item.description || '',
        content: item.content || '',
        type: 'news_api'
    }));

    return articles;
}

module.exports = {
    fetchNewsApiArticles
};