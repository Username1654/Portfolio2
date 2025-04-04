// Array of songs
const audioFiles = [
   "purrple-cat-green-tea(chosic.com).mp3",
   "Late-at-Night(chosic.com).mp3",
   "Hibiscus-chosic.com_.mp3",
   "Forgotten_Places-chosic.com_.mp3",
   "Daydreams-chosic.com_.mp3",
   "ASHUTOSH-Jaipur(chosic.com).mp3",
   "And-So-It-Begins-Inspired-By-Crush-Sometimes(chosic.com).mp3"
];

let currentIndex = 0; // Track which song is playing
const audio = new Audio(audioFiles[currentIndex]); // Load first song
audio.setAttribute('autoplay', 'autoplay')
// Select elements
const progressBar = document.getElementById("length");
const elapsedTime = document.getElementById("time");
const endTime = document.getElementById("end");

document.getElementById('range').addEventListener('input', function(){
    audio.volume = document.getElementById('range').value /100
})

let playing = true;
let timer;

// Function to load a song based on currentIndex
function loadSong(index) {
    audio.src = audioFiles[index];

    // Add event before loading to catch metadata properly
    audio.addEventListener("loadedmetadata", () => {
        endTime.innerText = formatTime(audio.duration);
    }, { once: true }); // "once" ensures it doesn't duplicate when switching songs

    audio.load(); // Load the audio file

    if (playing) {
        audio.play();
    }
}

// ⬇️ Call this immediately on page load
loadSong(currentIndex);

// Update progress bar and time
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + "%";
    elapsedTime.innerText = formatTime(audio.currentTime);
});

// Play/Pause function
function pause() {
    if (playing) {
        audio.pause();
        clearInterval(timer);
    } else {
        audio.play();
        timer = setInterval(() => {
            elapsedTime.innerText = formatTime(audio.currentTime);
        }, 1000);
    }
    playing = !playing;
}

// Skip function (Next song)
function skip() {
    currentIndex = (currentIndex + 1) % audioFiles.length; // Loop back to first song
    loadSong(currentIndex);
    audio.play();
}

// Back function (Previous song)
function back() {
    currentIndex = (currentIndex - 1 + audioFiles.length) % audioFiles.length; // Loop back to last song
    loadSong(currentIndex);
    audio.play();
}

// Restart function
function redo() {
    audio.currentTime = 0;
}

// When the song ends, play the next one
audio.addEventListener("ended", () => {
    skip();
});

// Format time helper function
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

setInterval(()=>{
    if (playing) {
        document.getElementById('start').innerHTML ='||'
        audio.play();
    }
    if(!playing){
         document.getElementById('start').innerHTML = '	&#x27A4;'
    }
},1000)
