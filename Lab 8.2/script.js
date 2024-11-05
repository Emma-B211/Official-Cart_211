const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let currentOscillator = null; // Track the current oscillator for simple playback

// Function to create and play an oscillator
function createOscillator(frequency = 440, startTime = audioContext.currentTime, duration = 1.0) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Set oscillator properties
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startTime);
    gainNode.gain.setValueAtTime(0.5, startTime);

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start and stop the oscillator
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);

    return oscillator;
}

// Note frequencies for "Happy Birthday" melody
const notes = [
    { frequency: 264, duration: 0.5 }, // "Happy"
    { frequency: 264, duration: 0.5 }, // "Birth"
    { frequency: 297, duration: 1.0 }, // "day"
    { frequency: 264, duration: 1.0 }, // "to"
    { frequency: 352, duration: 1.0 }, // "you"
    { frequency: 330, duration: 2.0 }, // "you"

    { frequency: 264, duration: 0.5 }, // "Happy"
    { frequency: 264, duration: 0.5 }, // "Birth"
    { frequency: 297, duration: 1.0 }, // "day"
    { frequency: 264, duration: 1.0 }, // "dear"
    { frequency: 396, duration: 1.0 }, // "friend"
    { frequency: 352, duration: 2.0 }, // "friend"

    { frequency: 264, duration: 0.5 }, // "Happy"
    { frequency: 264, duration: 0.5 }, // "Birth"
    { frequency: 440, duration: 1.0 }, // "day"
    { frequency: 352, duration: 1.0 }, // "to"
    { frequency: 330, duration: 1.0 }, // "you"
    { frequency: 297, duration: 2.0 }  // "you"
];

function playMelody() {
    let currentTime = audioContext.currentTime;

    notes.forEach(note => {
        createOscillator(note.frequency, currentTime, note.duration);
        currentTime += note.duration;
    });
}

// Simple play button with default frequency and duration
document.getElementById("playSound").addEventListener("click", () => {
    currentOscillator = createOscillator(); // Use default frequency (440 Hz) and duration (1 second)
    document.getElementById("playSound").disabled = true; // Disable play button
    document.getElementById("stopSound").disabled = false; // Enable stop button
});

// Stop button for simple playback
document.getElementById("stopSound").addEventListener("click", () => {
    if (currentOscillator) {
        currentOscillator.stop();
        currentOscillator = null;
    }
    document.getElementById("playSound").disabled = false; // Enable play button
    document.getElementById("stopSound").disabled = true; // Disable stop button
});

// Volume control slider
document.getElementById("volumeControl").addEventListener("input", (event) => {
    if (currentOscillator) {
        currentOscillator.gainNode.gain.setValueAtTime(event.target.value, audioContext.currentTime);
    }
});

// Frequency control slider
document.getElementById("frequencyControl").addEventListener("input", (event) => {
    if (currentOscillator) {
        currentOscillator.frequency.setValueAtTime(event.target.value, audioContext.currentTime);
    }
});

// Reset button
document.getElementById("resetButton").addEventListener("click", () => {
    document.getElementById("playSound").disabled = false; // Enable play button
    document.getElementById("stopSound").disabled = true; // Disable stop button
    document.getElementById("volumeControl").value = 0.5;
    document.getElementById("frequencyControl").value = 440;
});

document.getElementById("playMelody").addEventListener("click", playMelody);
