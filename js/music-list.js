let musicPlaylist = document.getElementById("music-playlist");

async function loadJson() {
    console.log("Loading music list...");
    try {
        const response = await fetch('../json/musics.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        musicList = data;
        displayMusicList();
    } catch (error) {
        console.error('Error loading JSON file:', error);
    }
}

function displayMusicList() {
    const songListDiv = document.getElementById("song-list");
    songListDiv.innerHTML = '';

    musicList.forEach((song, index) => {
        let songDiv = document.createElement("div");
        songDiv.classList.add("song");
        songDiv.dataset.index = index;

        songDiv.innerHTML = `
            <img src="${song.img}" alt="">
            <div class="song-info">
                <p>${song.name}</p>
                <i>${song.artist}</i>
            </div>
        `;
        
        document.getElementById("song-list").appendChild(songDiv);
    });

    // Delay the check to ensure the DOM is fully rendered
    requestAnimationFrame(() => {
        applyOverflowAnimation();
    });
}

function applyOverflowAnimation() {
    document.querySelectorAll('.song-info').forEach(songInfo => {
        const pText = songInfo.querySelector('p');
        const iText = songInfo.querySelector('i');

        // Log values to debug
        console.log("pText scrollWidth:", pText.scrollWidth, "clientWidth:", songInfo.clientWidth);
        console.log("iText scrollWidth:", iText.scrollWidth, "clientWidth:", songInfo.clientWidth);

        // Check overflow for the paragraph (song name)
        if (pText.scrollWidth > songInfo.clientWidth) {
            pText.classList.add("scroll-animation");
            console.log("pbig");
        } else {
            pText.classList.remove("scroll-animation");
        }

        // Check overflow for the artist name
        if (iText.scrollWidth > songInfo.clientWidth) {
            iText.classList.add("scroll-animation");
            console.log("ibig");
        } else {
            iText.classList.remove("scroll-animation");
        }
    });
}

loadJson();