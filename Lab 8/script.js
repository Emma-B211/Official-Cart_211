// Initialize Audio Context and Oscillator
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();

// Set initial oscillator properties
oscillator.type = 'sine'; // Options: 'sine', 'square', 'sawtooth', 'triangle'
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Default frequency (A4)
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);
gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Default volume

// Play Sound Button
document.getElementById("playSound").addEventListener("click", () => {
    oscillator.start();
    document.getElementById("playSound").disabled = true; // Disable play button after starting
});

document.getElementById("playMusic").addEventListener("click", () => {
    //oscillator.start();
    document.getElementById("playMusic").disabled = true; // Disable play button after starting
    const ambientSound = new Audio('test.mp3');
    ambientSound.loop = true;
    ambientSound.volume = 0.2;
    ambientSound.play();});
    document.getElementById("playMusic2").addEventListener("click", () => {
        //oscillator.start();
        document.getElementById("playMusic2").disabled = true; // Disable play button after starting
        const ambientSound = new Audio('moonlight.wav');
        ambientSound.loop = true;
        ambientSound.volume = 0.2;
        ambientSound.play();});
        document.getElementById("playMusic3").addEventListener("click", () => {
            //oscillator.start();
            document.getElementById("playMusic3").disabled = true; // Disable play button after starting
            const ambientSound = new Audio('rainmorning.mp3');
            ambientSound.loop = true;
            ambientSound.volume = 0.2;
            ambientSound.play();});
document.getElementById("stopSound").addEventListener("click", () =>{
    oscillator.stop();
    document.getElementById("stopSound").disabled=false;
} );
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


function createOscillator(frequency=440, startTime=audioContext.currentTime,duration=1.0){
    const oscillator=audioContext.createOscillator();
    const gainNode= audioContext.createGain();

    oscillator.type="sine";
    oscillator.frequency.setValueAtTime(frequency,startTime);
    gainNode.gain.setValueAtTime(0.5,startTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);

    return oscillator;
    
}



document.getElementById("playSound").addEventListener("click",()=>{
    createOscillator();
    oscillator.start();
    document.getElementById("playSound").disabled=true;
    document.getElementById("playSound").disabled=false;
});

 
//  const ambientSound = new Audio("761032__logicmoon__moonlight.wav");
// ambientSound.loop = true;
// ambientSound.volume = 0.2;
// ambientSound.play();