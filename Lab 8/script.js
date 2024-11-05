
// Initialize Audio Context and Oscillator
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();
let currentOscillator = null;
// Set initial oscillator properties
oscillator.type = 'sine'; // Options: 'sine', 'square', 'sawtooth', 'triangle'
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Default frequency (A4)
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);
gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Default volume
// Function to create and play an oscillator
// function createOscillator(frequency = 440, startTime = audioContext.currentTime, duration = 1.0) {
//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();

//     // Set oscillator properties
//     oscillator.type = 'sine';
//     oscillator.frequency.setValueAtTime(frequency, startTime);
//     gainNode.gain.setValueAtTime(0.5, startTime);

//     // Connect nodes
//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);

//     // Start and stop the oscillator
//     oscillator.start(startTime);
//     oscillator.stop(startTime + duration);

//     return oscillator;
// }

// Play Sound Button
document.getElementById("playSound").addEventListener("click", () => {
    oscillator.start();
    document.getElementById("playSound").disabled = true; // Disable play button after starting
    document.getElementById("playSound").disabled = true; // Disable play button
    document.getElementById("stopSound").disabled = false; // Enable stop button
});
document.getElementById("playMusic").addEventListener("click", () => {
    oscillator.start();
    document.getElementById("playMusic").disabled = true;
    const ambientSound = new Audio("trees.mp3"); // Replace with your file name 
    ambientSound.loop = true; ambientSound.volume = 0.2; // Set lower volume for background noise
    ambientSound.play();
    document.getElementById("playSound").disabled = true; // Disable play button
    document.getElementById("stopSound").disabled = false; // Enable stop button
});
document.getElementById("playMusic2").addEventListener("click", () => {
    oscillator.start();
    document.getElementById("playMusic2").disabled = true;
    const ambientSound = new Audio("rainmorning.mp3"); // Replace with your file name 
    ambientSound.loop = true; ambientSound.volume = 0.2; // Set lower volume for background noise
    ambientSound.play();
    document.getElementById("playSound").disabled = true; // Disable play button
    document.getElementById("stopSound").disabled = false; // Enable stop button
});
document.getElementById("playMusic3").addEventListener("click", () => {
    oscillator.start();
    document.getElementById("playMusic3").disabled = true;
    const ambientSound = new Audio("beach.mp3"); // Replace with your file name 
    ambientSound.loop = true; ambientSound.volume = 0.2; // Set lower volume for background noise
    ambientSound.play();
    document.getElementById("playSound").disabled = true; // Disable play button
    document.getElementById("stopSound").disabled = false; // Enable stop button
});

document.getElementById("stopSound").addEventListener("click", () => {
    if (currentOscillator) {
        currentOscillator.stop();
        currentOscillator = null;
    }
    document.getElementById("playSound").disabled = false; // Enable play button
    document.getElementById("stopSound").disabled = false; // Disable stop button
});
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

// document.getElementById("playMusic").addEventListener("click",()=>{
//     oscillator.start();
//     document.getElementById("playMusic").disabled=true;
//     const ambientSound = new Audio("trees.mp3"); // Replace with your file name 
//     ambientSound.loop = true; ambientSound.volume = 0.2; // Set lower volume for background noise
//      ambientSound.play();
// } );

// Volume Control Slider
document.getElementById("volumeControl").addEventListener("input", (event) => {
    gainNode.gain.setValueAtTime(event.target.value, audioContext.currentTime);
});

// Frequency Control (Pitch) Slider
document.getElementById("frequencyControl").addEventListener("input", (event) => {
    oscillator.frequency.setValueAtTime(event.target.value, audioContext.currentTime);
});

// Reset Button to restore default settings
function resetSettings() {
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Reset volume
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Reset frequency
    document.getElementById("volumeControl").value = 0.5;
    document.getElementById("frequencyControl").value = 440;
}

document.getElementById("resetButton").addEventListener("click", resetSettings);
