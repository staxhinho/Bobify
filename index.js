const express = require('express');
const { readFile } = require('node:fs');
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const app = express();
const port = 8497;

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "./"));

app.use(connectLivereload());

app.use(express.static(path.join(__dirname, "./")));

app.get('/', (req, res) => {
    readFile(path.join(__dirname, "./index.html"), "utf-8", (err, html) => {
        if (err) {
            res.status(500).send("sorry, out of order");
        }

        res.send(html);
    });


});

app.listen(port, () => console.log(`Bobify available on http://localhost:${port}`));
