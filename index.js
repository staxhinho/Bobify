const express = require('express');
const fs = require('fs').promises;
const path = require("path");
const multer = require('multer');

const app = express();
const port = 8497;

const audioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'music');
        fs.mkdir(uploadPath, { recursive: true }, (err) => cb(err, uploadPath)); // Ensure the music folder exists
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        cb(null, Date.now() + fileExtension); // Give a unique name based on timestamp
    }
});

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'img');
        fs.mkdir(uploadPath, { recursive: true }, (err) => cb(err, uploadPath)); // Ensure the img folder exists
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        cb(null, Date.now() + fileExtension); // Give a unique name based on timestamp
    }
});

const uploadAudio = multer({ storage: audioStorage });
const uploadImage = multer({ storage: imageStorage });

app.use(express.json());
app.use(express.static(path.join(__dirname, "./")));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'music')));

const jsonFilePath = path.join(__dirname, 'json', 'musics.json');

app.get('/', (req, res) => {
    readFile(path.join(__dirname, "./index.html"), "utf-8", (err, html) => {
        if (err) {
            res.status(500).send("sorry, out of order");
        }

        res.send(html);
    });
});

app.get('/api/musics', async (req, res) => {
    try {
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const data = JSON.parse(jsonData);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read JSON file' });
    }
});

// Use PATCH to upload song and image with separate handlers for each file type
app.patch('/api/musics', uploadAudio.single('songFile'), uploadImage.single('imageFile'), async (req, res) => {
    try {
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        let songs = JSON.parse(jsonData);

        if (!Array.isArray(songs)) {
            throw new Error("JSON file is not an array.");
        }

        // Get new song details from request
        const newSong = req.body;

        // Handle file uploads if they exist
        if (req.file && req.file.fieldname === 'songFile') {
            newSong.src = `/music/${req.file.filename}`; // Store the music file path in the JSON
        }

        if (req.imageFile && req.imageFile.fieldname === 'imageFile') {
            newSong.img = `/img/${req.imageFile.filename}`; // Store the image file path in the JSON
        }

        // Validate the new song format
        if (!newSong || typeof newSong !== 'object') {
            return res.status(400).json({ error: "Invalid song format." });
        }

        // Append the new song and write updated JSON file
        songs.push(newSong);
        await fs.writeFile(jsonFilePath, JSON.stringify(songs, null, 2), 'utf-8');
        
        res.json({ message: 'Song added successfully', updatedSongs: songs });
    } catch (error) {
        console.error('Error updating JSON file:', error);
        res.status(500).json({ error: 'Failed to update JSON file' });
    }
});


app.listen(port, () => console.log(`Bobify available on http://localhost:${port}`));
