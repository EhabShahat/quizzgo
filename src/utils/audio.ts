
// Sound effect utility functions

// Preload audio files
const loadAudio = (src: string): HTMLAudioElement => {
  const audio = new Audio(src);
  // Add error handling for debugging
  audio.addEventListener('error', (e) => {
    console.error(`Error loading audio from ${src}:`, e);
  });
  return audio;
};

// Properly formatted audio URLs with correct sources
const tickSound = loadAudio("/sounds/countdown.mp3");
const cheerSound = loadAudio("/sounds/celebration.mp3");
const successSound = loadAudio("/sounds/correct_answer.mp3");

// Default volume
const DEFAULT_VOLUME = 0.8;
// Tick sound needs to be a bit softer
const TICK_VOLUME = 0.5;

// Variable to track if tick sound is currently playing
let isTickPlaying = false;

// Get sound enabled setting from localStorage and Supabase
const getSoundEnabled = (): boolean => {
  const setting = localStorage.getItem('soundEnabled');
  return setting === null ? true : setting === 'true';
};

export const playTickSound = () => {
  if (!getSoundEnabled() || isTickPlaying) return;
  console.log("Playing tick sound");
  
  // Set the flag to prevent overlapping sounds
  isTickPlaying = true;
  
  // Stop and reset current playback before playing again
  tickSound.pause();
  tickSound.currentTime = 0;
  tickSound.volume = TICK_VOLUME;
  
  // Play with promise handling for debugging
  tickSound.play()
    .then(() => {
      // Reset after sound finishes
      setTimeout(() => {
        isTickPlaying = false;
      }, 400); // Short delay to prevent rapid repeats
    })
    .catch((e) => {
      console.error("Error playing tick sound:", e);
      isTickPlaying = false;
    });
};

export const playCheerSound = () => {
  if (!getSoundEnabled()) return;
  console.log("Playing cheer sound");
  
  // Stop and reset current playback before playing again
  cheerSound.pause();
  cheerSound.currentTime = 0;
  cheerSound.volume = DEFAULT_VOLUME;
  
  // Play with promise handling for debugging
  cheerSound.play()
    .catch((e) => console.error("Error playing cheer sound:", e));
};

export const playSuccessSound = () => {
  if (!getSoundEnabled()) return;
  console.log("Playing success sound");
  
  // Stop and reset current playback before playing again
  successSound.pause();
  successSound.currentTime = 0;
  successSound.volume = DEFAULT_VOLUME;
  
  // Play with promise handling for debugging
  successSound.play()
    .catch((e) => console.error("Error playing success sound:", e));
};

// Update sound enabled setting in localStorage
export const setSoundEnabled = (enabled: boolean): void => {
  console.log(`Setting sound enabled to: ${enabled}`);
  localStorage.setItem('soundEnabled', enabled.toString());
};

// Get current sound enabled status
export const isSoundEnabled = (): boolean => {
  return getSoundEnabled();
};
