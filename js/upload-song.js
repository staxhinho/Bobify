let songName = document.getElementById("song-name");
let songArtist = document.getElementById("song-artist");
let songThumb = document.getElementById("song-thumb");
let songFile = document.getElementById("song-mp3");
let testbox = document.getElementById("test");



fetch("../json/musics.json")
    .then(response => response.json())
    .then(data => {
        musicList = data;
    })
    .catch(error => console.error("Error loading music list:", error));

function UploadSong() {
    /*if (!songName.value || !songArtist.value || !songThumb.files.length || !songFile.files.length) {
        alert("Please fill in all fields!");
        return;
    }*/

    let newSong = {
        name: songName.value,
        //artist: songArtist.value,
        //img: URL.createObjectURL(songThumb.files[0]), // Temporary image URL
        //src: URL.createObjectURL(songFile.files[0])   // Temporary audio URL
    };

    musicList.push(newSong);
    console.log("Song uploaded:", newSong);
}