const OpenAI = require("openai")

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

async function generateSummary(reportText) {
    if (!reportText) {
        throw new Error("No report text provided")
    }

    const response = await client.responses.create({
        model: "gpt-5.2-mini",
        input: `
Summarize this media monitoring report.

Return:
- short summary
- 3 key points
- important entities
- tone
- possible tags

Report:
${reportText}
        `
    })

    return response.output_text
}

module.exports = {
    generateSummary
}