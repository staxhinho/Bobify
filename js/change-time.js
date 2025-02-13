let move = document.querySelector(".dot");
let progressBar = document.querySelector("progress");
let audio = document.querySelector("audio");
let durationContainer = document.querySelector(".duration");

let isDragging = false;

// Function to update the music time based on the bar click or drag
function updateMusicTime(event) {
    let barRect = durationContainer.getBoundingClientRect();
    let clickPosition = event.clientX - barRect.left;
    let percentage = clickPosition / barRect.width;
    let newTime = percentage * audio.duration;

    audio.currentTime = newTime;
}

// Mouse down event starts the dragging
move.addEventListener("mousedown", () => {
    isDragging = true;
    document.addEventListener("mousemove", dragTime);
    document.addEventListener("mouseup", stopDragging);
});

// Mouse move event updates the progress while dragging
function dragTime(event) {
    if (!isDragging) return;
    updateMusicTime(event);
}

// Mouse up event stops the dragging
function stopDragging(event) {
    isDragging = false;
    updateMusicTime(event);
    document.removeEventListener("mousemove", dragTime);
    document.removeEventListener("mouseup", stopDragging);
}

// Allow clicking anywhere on the bar to change time
durationContainer.addEventListener("click", updateMusicTime);