const express = require('express');
const fs = require('fs').promises;
const path = require("path");
const multer = require('multer');

const app = express();
const port = 8497;

// Storage for Audio Files
const audioStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'music');
        await fs.mkdir(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Storage for Image Files
const imageStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'img/thumbnails');
        await fs.mkdir(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Multer upload instances
const uploadAudio = multer({ storage: audioStorage });
const uploadImage = multer({ storage: imageStorage });

// Corrected uploadMulti using separate storage handlers
const uploadMulti = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            if (file.fieldname === "songFile") {
                cb(null, path.join(__dirname, "music"));
            } else if (file.fieldname === "imageFile") {
                cb(null, path.join(__dirname, "img/thumbnails"));
            } else {
                cb(new Error("Invalid file fieldname"), null);
            }
        },
        filename: function (req, file, cb) {
            let safeName = req.body.name.replace(/[<>:"\/\\|?*]+/g, ""); // Remove invalid filename characters
            let extension = path.extname(file.originalname);
            cb(null, `${safeName}${extension}`);
        }
    })
}).fields([
    { name: 'songFile', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 }
]);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "./")));
app.use(express.static(path.join(__dirname, 'img/thumbnails')));
app.use(express.static(path.join(__dirname, 'music')));
app.use(express.urlencoded({ extended: true }));

const jsonFilePath = path.join(__dirname, 'json', 'musics.json');

// API Routes
app.patch('/api/musics', uploadMulti, async (req, res) => {
    try {
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        let songs = JSON.parse(jsonData);

        if (!Array.isArray(songs)) {
            throw new Error("JSON file is not an array.");
        }

        const newSong = req.body;
        let safeName = newSong.name.replace(/[<>:"\/\\|?*]+/g, ""); // Remove invalid characters

        // Assign uploaded file paths with song name
        if (req.files['songFile']) {
            newSong.src = `/music/${safeName}${path.extname(req.files['songFile'][0].originalname)}`;
        }
        if (req.files['imageFile']) {
            newSong.img = `/img/thumbnails/${safeName}${path.extname(req.files['imageFile'][0].originalname)}`;
        }

        // Validate new song data
        if (!newSong || typeof newSong !== 'object') {
            return res.status(400).json({ error: "Invalid song format." });
        }

        songs.push(newSong);
        await fs.writeFile(jsonFilePath, JSON.stringify(songs, null, 2), 'utf-8');
        
        res.json({ message: 'Song added successfully', updatedSongs: songs });
    } catch (error) {
        console.error('Error updating JSON file:', error);
        res.status(500).json({ error: 'Failed to update JSON file' });
    }
});

// Start Server
app.listen(port, () => console.log(`Bobify available on http://localhost:${port}`));
