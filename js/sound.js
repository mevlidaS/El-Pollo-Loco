let coinCollectSound = new Audio('audio/coins_collected.wav');
let bottleCollectSound = new Audio('audio/bottle_collected.wav');
let walkingSound = new Audio('audio/running.mp3');
let getHurtSound = new Audio('audio/character_hurt.mp3');
let jumpSound = new Audio('audio/pepe_jump.wav');
let winSound = new Audio('audio/gewonnen.mp3');
let endbossHurtSound = new Audio('audio/endboss_hurt (2).wav');
let backgroundMusic = new Audio('audio/background.wav');
let endbossMusic = new Audio('audio/endboss_kommt.mp3');
let sleepSound = new Audio('audio/sleep.wav');
let soundActive = false;

function initGame() {
    updateAllSounds();
    updateSoundButtonIcon();
}

function playAudio(audio) {
    if (soundActive && audio) {
        audio.volume = 0.5;
        audio.play().catch(error => console.error('Audio play error:', error));
    }
}

function toggleSoundActive() {
    soundActive = !soundActive;
    updateAllSounds();
    updateSoundButtonIcon();
}

function updateSoundButtonIcon() {
    const soundIcon = soundActive ? './img/audio.png' : './img/noaudio.png';
    document.getElementById('sound-img').src = soundIcon;
}

function updateAllSounds() {
    if (soundActive) {
        backgroundMusic.volume = 0.2;
        backgroundMusic.play().catch(error => console.error('Audio play error:', error));
        setAllSoundVolumes(0.5);
    } else {
        stopAllSounds();
    }
}

function setAllSoundVolumes(volume) {
    let sounds = [coinCollectSound, bottleCollectSound, walkingSound, getHurtSound, jumpSound, winSound, endbossHurtSound, backgroundMusic, endbossMusic, sleepSound];
    sounds.forEach(sound => {
        sound.volume = volume;
    });
}

function stopAllSounds() {
    let sounds = [coinCollectSound, bottleCollectSound, walkingSound, getHurtSound, jumpSound, winSound, endbossHurtSound, backgroundMusic, endbossMusic, sleepSound];
    sounds.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
}

function stopAllSoundsExceptWin() {
    let sounds = [coinCollectSound, bottleCollectSound, walkingSound, getHurtSound, jumpSound, endbossHurtSound, backgroundMusic, endbossMusic, sleepSound];
    sounds.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
    if (soundActive) {
        winSound.volume = 0.5;
        winSound.play().catch(error => console.error('Audio play error:', error));
    }
}

window.onload = initGame;
