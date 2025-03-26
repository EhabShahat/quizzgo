
// Sound effect utility functions

// Preload audio files
const loadAudio = (src: string): HTMLAudioElement => {
  const audio = new Audio(src);
  return audio;
};

// Kahoot-inspired sound effects
const tickSound = loadAudio("https://kahoot-sound-effects.s3.amazonaws.com/countdown.mp3");
// Celebration sound
const cheerSound = loadAudio("https://kahoot-sound-effects.s3.amazonaws.com/celebration.mp3");
// Success sound
const successSound = loadAudio("https://kahoot-sound-effects.s3.amazonaws.com/correct_answer.mp3");

// Default volume
const DEFAULT_VOLUME = 0.8;

// Get sound enabled setting from localStorage (default to true if not set)
const getSoundEnabled = (): boolean => {
  const setting = localStorage.getItem('soundEnabled');
  return setting === null ? true : setting === 'true';
};

export const playTickSound = () => {
  if (!getSoundEnabled()) return;
  
  tickSound.currentTime = 0;
  tickSound.volume = DEFAULT_VOLUME;
  tickSound.play().catch((e) => console.error("Error playing tick sound:", e));
};

export const playCheerSound = () => {
  if (!getSoundEnabled()) return;
  
  cheerSound.currentTime = 0;
  cheerSound.volume = DEFAULT_VOLUME;
  cheerSound.play().catch((e) => console.error("Error playing cheer sound:", e));
};

export const playSuccessSound = () => {
  if (!getSoundEnabled()) return;
  
  successSound.currentTime = 0;
  successSound.volume = DEFAULT_VOLUME;
  successSound.play().catch((e) => console.error("Error playing success sound:", e));
};

// Update sound enabled setting in localStorage
export const setSoundEnabled = (enabled: boolean): void => {
  localStorage.setItem('soundEnabled', enabled.toString());
};

// Get current sound enabled status
export const isSoundEnabled = (): boolean => {
  return getSoundEnabled();
};
