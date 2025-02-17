document.querySelector(".pause-btn").style.display = "none";
document.querySelector(".play-btn").addEventListener("click", playMusic);
document.querySelector(".pause-btn").addEventListener("click", pauseMusic);

let musicList = [];

let music = document.querySelector("audio");

let musicIndex = 0;

let musicDuration = document.querySelector(".end");
let thumbnail = document.querySelector(".thumbnail");
let songName = document.querySelector(".description h2");
let artistName = document.querySelector(".description i");

music.addEventListener("timeupdate", progressUpdate);

async function loadJson() {
    try {
        const response = await fetch('../json/musics.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        musicList = data;
        renderMusic(musicIndex);
    } catch (error) {
        console.error('Error loading JSON file:', error);
    }
}

loadJson();

document.querySelector(".back-btn").addEventListener("click", () => {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = musicList.length - 1;
    }
    renderMusic(musicIndex);
    playMusic();
});
document.querySelector(".next-btn").addEventListener("click", () => {
    musicIndex++;
    if (musicIndex > musicList.length) {
        musicIndex = 0;
    }
    renderMusic(musicIndex);
    playMusic();
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
    let bar = document.querySelector("progress");
    bar.style.width = Math.floor((music.currentTime / music.duration) * 100) + "%";

    let elapsedTime = document.querySelector(".start");
    elapsedTime.textContent = secondsToMinutes(Math.floor(music.currentTime));
}

function secondsToMinutes(seconds){
    let minutesField = Math.floor(seconds / 60);
    let secondsField = seconds % 60;
    if (secondsField < 10) {
        secondsField = "0" + secondsField;
    }

    return minutesField+":"+secondsField;
}