
// Sound effect utility functions

// Preload audio files
const loadAudio = (src: string): HTMLAudioElement => {
  const audio = new Audio(src);
  return audio;
};

// Countdown tick sound
const tickSound = loadAudio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
// Celebration sound
const cheerSound = loadAudio("https://assets.mixkit.co/active_storage/sfx/2410/2410-preview.mp3");
// Success sound
const successSound = loadAudio("https://assets.mixkit.co/active_storage/sfx/1111/1111-preview.mp3");

export const playTickSound = () => {
  tickSound.currentTime = 0;
  tickSound.volume = 0.5;
  tickSound.play().catch((e) => console.error("Error playing tick sound:", e));
};

export const playCheerSound = () => {
  cheerSound.currentTime = 0;
  cheerSound.volume = 0.7;
  cheerSound.play().catch((e) => console.error("Error playing cheer sound:", e));
};

export const playSuccessSound = () => {
  successSound.currentTime = 0;
  successSound.volume = 0.7;
  successSound.play().catch((e) => console.error("Error playing success sound:", e));
};
