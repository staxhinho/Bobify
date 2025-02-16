let musicPlayer = document.getElementById("music-player");

function PlayerBtn() {
    musicPlayer.style.display = "flex";
    musicPlaylist.style.display = "none";
}

function PlaylistBtn() {
    musicPlayer.style.display = "none";    
    musicPlaylist.style.display = "flex";
}