let musicPlaylist = document.getElementById("music-playlist");

// Fetch songs from JSON
fetch("../json/musics.json")
    .then(response => response.json())
    .then(data => {
        musicList = data;
        displayMusicList();
    })
    .catch(error => console.error("Error loading music list:", error));

function displayMusicList() {
    document.createElement("div");
    
    musicList.forEach((song, index) => {
        let songDiv = document.createElement("div");
        songDiv.classList.add("song");
        songDiv.dataset.index = index; // Store index to retrieve later
        
        songDiv.innerHTML = `
            <img src="${song.img}" alt="">
            <div class="song-info">
                <p>${song.name}</p>
                <i>${song.artist}</i>
            </div>
        `;
        
        musicPlaylist.appendChild(songDiv);

        document.querySelectorAll('.song-info p, .song-info i').forEach(text => {
            const parent = text.parentElement;
            
            if (text.scrollWidth > parent.clientWidth) {
                text.style.animation = "scrollText 3s linear infinite";
            } else {
                text.style.animation = "none";
            }
        });
    });
}