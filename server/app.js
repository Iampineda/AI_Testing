const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

const { generateSummary }  = require('./services/aisummary')
const { fetchRssArticles } = require('./services/rssService');
const { saveArticles, getArticles } = require('./services/articleStore');
const { fetchNewsApiArticles } = require('./services/newsApiService');
const { scrapeBasicPage } = require('./services/webScraperService');

// -- Middleware -- //
app.use(cors())
app.use(express.json())

// -- Testing Route -- //
app.get('/', (req, res) => {
    res.send("Running Server")
})

// -- AI Route -- //
app.post('/summary', async (req, res) => {
   
    try {
        const { reportText} = req.body
        console.log(reportText)
        const summary = await generateSummary(reportText)
        console.log(summary)
        res.json({
            success: true,
            summary
        })
    }
    catch(error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: "Summary Generation Failed"
        })    
    }

})

// -- Data Collection -- //
app.get('/collect/rss', async (req, res) => {
    try {
        const articles = await fetchRssArticles();

        saveArticles(articles);

        res.json({
            success: true,
            count: articles.length,
            articles
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Failed to collect RSS articles'
        });
    }
});

app.get('/collect/news', async (req, res) => {
    try {
        const query = req.query.q;

        const articles = await fetchNewsApiArticles(query);

        saveArticles(articles);

        res.json({
            success: true,
            count: articles.length,
            articles
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Failed to collect News API articles'
        });
    }
});

app.get('/collect/scrape', async (req, res) => {
    try {
        const url = req.query.url;

        const scrapedData = await scrapeBasicPage(url);

        res.json({
            success: true,
            data: scrapedData
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Failed to scrape page'
        });
    }
});
// -- Start Server -- // 
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
})