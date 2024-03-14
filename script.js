document.querySelector(".pause-btn").style.display = "none";

var musicList = [
    {name:"Josh A - No Chill (Ft. MrTLexify)", artist:"Josh A (Ft. MrTLexify)", src:"music/Josh A - No Chill (Ft. MrTLexify).mp3", img:"img/Josh A - No Chill (Ft. MrTLexify).jpg"},
    {name:"PARALISIA DO SONO! TEM UM BICHO NO MEU QUARTO!", artist: "D$ Luqi", src:"music/PARALISIA DO SONO! TEM UM BICHO NO MEU QUARTO!.mp3", img:"img/PARALISIA DO SONO! TEM UM BICHO NO MEU QUARTO!.jpg"}
];

var music = document.querySelector("audio");

var musicIndex = 0;

var musicDuration = document.querySelector(".end");
var thumbnail = document.querySelector(".thumbnail");
var songName = document.querySelector(".description h2");
var artistName = document.querySelector(".description i");

renderMusic(musicIndex);

document.querySelector(".play-btn").addEventListener("click", playMusic);
document.querySelector(".pause-btn").addEventListener("click", pauseMusic);

music.addEventListener("timeupdate", progressUpdate);

document.querySelector(".back-btn").addEventListener("click", () => {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = 1;
    }
    renderMusic(musicIndex);
    music.play();
});
document.querySelector(".next-btn").addEventListener("click", () => {
    musicIndex++;
    if (musicIndex > 1) {
        musicIndex = 0;
    }
    renderMusic(musicIndex);
    music.play();
});

function renderMusic(index) {
    music.setAttribute("src", musicList[index].src);
    music.addEventListener("loadeddata", () => {
        songName.textContent = musicList[index].name;
        artistName.textContent = musicList[index].artist;
        thumbnail.src = musicList[index].img;
        /*thumbnail.setAttribute("src", musicList[index].img);*/
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