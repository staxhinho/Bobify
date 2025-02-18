let songName = document.getElementById("song-name");
let songArtist = document.getElementById("song-artist");
let songThumb = document.getElementById("song-thumb");
let songFile = document.getElementById("song-mp3");
let testbox = document.getElementById("test");

musicList = [];

async function readJson() {
    console.log("Loading music list...");
    try {
        const response = await fetch('/api/musics');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        musicList = data;
    } catch (error) {
        console.error('Error loading JSON file:', error);
    }
}

readJson();

async function addSong(formData) {
    try {
        const response = await fetch('/api/musics', {
            method: 'PATCH',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to add song');
        }

        const result = await response.json();
        console.log(result.message, result.updatedSongs);
    } catch (error) {
        console.error('Error adding song:', error);
    }
}

async function UploadSong() {
    /*if (!songName.value || !songArtist.value || !songThumb.files.length || !songFile.files.length) {
        alert("Please fill in all fields!");
        return;
    }*/

    console.log("clicked")

    const formData = new FormData();
    formData.append('songName', songName.value);
    formData.append('songArtist', songArtist.value);
    formData.append('songFile', songFile.files[0]);
    formData.append('imageFile', songThumb.files[0]);

    await addSong(formData);
}