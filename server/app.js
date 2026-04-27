const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// -- Middleware -- //
app.use(cors())
app.use(express.json())

// -- Testing Route -- //
app.get('/', (req, res) => {
    res.send("Running Server")
})

// -- AI Route -- //
app.post('/summarize', (req, res) => {
    res.json({ message: "Summary Route Working"})
})

// -- Start Server -- // 
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
})