document.querySelector(".pause-btn").style.display = "none";

var musicList = [
    {Name:"Josh A - No Chill (Ft. MrTLexify)", Artist:"Josh A (Ft. MrTLexify)", src:"music/Josh A - No Chill (Ft. MrTLexify).flac", img:"img/Josh A - No Chill (Ft. MrTLexify).jpg"},
    {Name:"PARALISIA DO SONO! TEM UM BICHO NO MEU QUARTO!", Artist: "D$ Luqi", src:"PARALISIA DO SONO! TEM UM BICHO NO MEU QUARTO!.flac", img:"img/PARALISIA DO SONO! TEM UM BICHO NO MEU QUARTO!.jpg"}
]

var music = document.querySelector("audio");

var musicIndex = 0;

var thumbnail = document.querySelector(".Thumbnail img");
var songName = document.querySelector(".description h2");
var artistName = document.querySelector(".description i");

document.querySelector(".play-btn").addEventListener("click", playMusic);
document.querySelector(".pause-btn").addEventListener("click", pauseMusic);

music.addEventListener("timeupdate", progressUpdate);

document.querySelector(".back-btn").addEventListener("click", () => {
    musicIndex--;
    renderMusic(musicIndex);
});
document.querySelector(".next-btn").addEventListener("click", () => {
    musicIndex++;
    renderMusic(musicIndex);
});

function renderMusic(index) {
    music.setAttribute("src", musicList[index].src);
    music.addEventListener("loadeddata", () => {
        songName.textContent = musicList[index].Name;
        artistName.textContent = musicList[index].Artist;
        thumbnail.src = musicList[index].img;
        musicDuration.textContent = secondsToMinutes(Math.floor(music.duration));
    });
}

function secondsToMinutes(seconds){
    var minutesArray = Math.floor(seconds / 60);
    var secondsArray = seconds % 60;
    if (secondsArray < 10) {
        secondsArray = "0" + secondsArray;
    }

    return minutesArray+":"+secondsArray;
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
    bar.style.width = (music.currentTime / music.duration) * 100 + "%";

    var elapsedTime = document.querySelector(".start");
    elapsedTime.textContent = secondsToMinutes(Math.floor(music.currentTime));

    var musicDuration = document.querySelector(".end");
    musicDuration.textContent = secondsToMinutes(Math.floor(music.duration));
}