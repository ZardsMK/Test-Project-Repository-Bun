import express from "express"
import cors from "cors";
import scrapeAmazon from "./src/scrape"

const app = express();
const PORT = 2000
app.use(cors());  

// define get on this route, to take the response of the frontend with the valor key

app.get("/api/scrape", async (req, res) => {
    const key = req.query.keyword;
    if(!key) return res.status(400).json({
        error: "KeyWord required"
    })
    
    try {
        // take the key and call the scrapeAmazon
        const data = await scrapeAmazon(key)
        res.json(data)
    } catch (err) {
        res.status(500).json({
            error: "Error"
        })
    }
})

// run on the port 2000
app.listen(PORT, () => {
    console.log(`Hello World, port ${PORT} is active.`)
})
