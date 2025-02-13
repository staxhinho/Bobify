document.querySelector(".pause-btn").style.display = "none";

var musicList = [];

var music = document.querySelector("audio");

var musicIndex = 0;

var musicDuration = document.querySelector(".end");
var thumbnail = document.querySelector(".thumbnail");
var songName = document.querySelector(".description h2");
var artistName = document.querySelector(".description i");

fetch ("../musics.json")
    .then(response => response.json())
    .then(data => {
        musicList = data;
        renderMusic(musicIndex);
    })
    .catch(error => console.error("Error loading music list:", error));

document.querySelector(".play-btn").addEventListener("click", playMusic);
document.querySelector(".pause-btn").addEventListener("click", pauseMusic);

music.addEventListener("timeupdate", progressUpdate);

document.querySelector(".back-btn").addEventListener("click", () => {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = musicList.length - 1;
    }
    renderMusic(musicIndex);
    music.play();
});
document.querySelector(".next-btn").addEventListener("click", () => {
    musicIndex++;
    if (musicIndex > musicList.length) {
        musicIndex = 0;
    }
    renderMusic(musicIndex);
    music.play();
});

function renderMusic(index) {
    if (musicList.length === 0) return;

    music.setAttribute("src", musicList[index].src);
    music.addEventListener("loadeddata", () => {
        songName.textContent = musicList[index].name;
        artistName.textContent = musicList[index].artist;
        thumbnail.src = musicList[index].img;
        musicDuration.textContent = secondsToMinutes(Math.floor(music.duration));
    });
}

function playMusic() {
    music.play();
    document.querySelector(".pause-btn").style.display = "block";
    document.querySelector(".play-btn").style.display = "none";
}

function pauseMusic() {
    music.pause();
    document.querySelector(".pause-btn").style.display = "none";
    document.querySelector(".play-btn").style.display = "block";
}

function progressUpdate() {
    var bar = document.querySelector("progress");
    bar.style.width = Math.floor((music.currentTime / music.duration) * 100) + "%";

    var elapsedTime = document.querySelector(".start");
    elapsedTime.textContent = secondsToMinutes(Math.floor(music.currentTime));
}

function secondsToMinutes(seconds){
    var minutesField = Math.floor(seconds / 60);
    var secondsField = seconds % 60;
    if (secondsField < 10) {
        secondsField = "0" + secondsField;
    }

    return minutesField+":"+secondsField;
}