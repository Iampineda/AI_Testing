const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/articles.json');

function getArticles() {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

function saveArticles(newArticles) {
    const existingArticles = getArticles();

    const combined = [...existingArticles, ...newArticles];

    fs.writeFileSync(filePath, JSON.stringify(combined, null, 2));
}

module.exports = {
    getArticles,
    saveArticles
};