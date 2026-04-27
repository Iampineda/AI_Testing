const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

const { generateSummary }  = require('./services/aisummary')

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
        const summary = await generateSummary(reportText)

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

// -- Start Server -- // 
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
})