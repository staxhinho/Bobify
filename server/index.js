const express = require('express');
const fs = require('fs').promises;
const path = require("path");

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        const html = await fs.readFile(path.join(__dirname, "../public/html/index.html"), "utf-8");
        res.send(html);
    } catch (err) {
        res.status(500).send('Error reading HTML file');
    }
});

// Start Server
app.listen(port, () => console.log(`Bobify available on http://localhost:${port}`));
