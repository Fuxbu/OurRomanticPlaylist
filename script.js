const audio = document.getElementById("audio");
const audioSource = document.getElementById("audio-source");
const playPauseButton = document.getElementById("play-pause-button");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const progressBar = document.getElementById("progress-bar");
const galleryImages = [
  "OurImg1.jpeg",
  "OurImg2.jpg",
  "OurImg3.jpeg",
  "OurImg4.jpg",
  "OurImg5.jpeg",
  "OurImg6.jpeg",
  "OurImg7.jpg",
  "OurImg8.jpeg",
  "OurImg9.jpeg",
  "OurImg10.JPG",
]; // Add your image filenames here

let currentImageIndex = 0;
let currentSongIndex = 0;
let isPlaying = false; // Track if the song is playing

// Predefined songs array for 15 songs
const songs = [
  "Song1.mp3",
  "Song2.mp3",
  "Song3.mp3",
  "Song4.mp3",
  "Song5.mp3",
  "Song6.mp3",
  "Song7.mp3",
  "Song8.mp3",
  "Song9.mp3",
  "Song10.mp3",
  "Song11.mp3",
  "Song12.mp3",
  "Song13.mp3",
  "Song14.mp3",
  "Song15.mp3",
];

// Function to update the gallery image
function updateGallery() {
  const galleryImage = document.getElementById("gallery-image");
  galleryImage.style.transition = "opacity 1s ease"; // Ensure smooth transition
  galleryImage.style.opacity = 0; // Fade out
  setTimeout(() => {
    galleryImage.src = galleryImages[currentImageIndex];
    galleryImage.style.opacity = 1; // Fade in
  }, 1000); // Wait for the fade out
}

// Change image every 7 seconds
setInterval(() => {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updateGallery();
}, 7000); // Change interval to 7 seconds

// Toggle Play/Pause
playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; // Change button to play icon
  } else {
    audioSource.src = songs[currentSongIndex];
    audio.load();
    audio.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Change button to pause icon
  }
  isPlaying = !isPlaying; // Toggle play/pause state
});

// Play next song
nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  audioSource.src = songs[currentSongIndex];
  audio.load();
  audio.play();
  playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Keep it as pause
  isPlaying = true;
});

// Play previous song
prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  audioSource.src = songs[currentSongIndex];
  audio.load();
  audio.play();
  playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Keep it as pause
  isPlaying = true;
});

// Function to play the next song automatically when the current song ends
audio.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length; // Move to the next song
  audioSource.src = songs[currentSongIndex]; // Update the audio source
  audio.load(); // Load the new audio
  audio.play(); // Play the next song
  playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Keep it as pause
  isPlaying = true; // Update playing state
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progressPercent;
});

// Seek functionality
progressBar.addEventListener("click", (event) => {
  const rect = progressBar.getBoundingClientRect();
  const x = event.clientX - rect.left; // Get the mouse position relative to the progress bar
  const width = rect.width;
  const percent = x / width; // Calculate the percentage of the progress bar clicked
  audio.currentTime = percent * audio.duration; // Set audio time to the clicked position
});

// Allow seeking by dragging the progress bar
progressBar.addEventListener("mousedown", () => {
  const onMouseMove = (event) => {
    const rect = progressBar.getBoundingClientRect();
    const x = event.clientX - rect.left; // Get the mouse position relative to the progress bar
    const width = rect.width;
    const percent = x / width; // Calculate the percentage of the progress bar clicked
    audio.currentTime = percent * audio.duration; // Set audio time to the clicked position
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener(
    "mouseup",
    () => {
      document.removeEventListener("mousemove", onMouseMove); // Stop listening for mousemove
    },
    { once: true }
  ); // Ensure this event listener is removed after first call
});
