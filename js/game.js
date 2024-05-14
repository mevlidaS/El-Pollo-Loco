let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, endGame, winGame);
    updateAllSounds();
    updateSoundButtonIcon();
}

function showMobileButtons() {
    if (window.innerWidth <= 720 || window.innerHeight <= 480) {
        const mobileButtons = document.getElementById('mobileButtons');
        if (mobileButtons) {
            mobileButtons.classList.remove('d-none');
        }
    }
}

function hideMobileButtons() {
    const mobileButtons = document.getElementById('mobileButtons');
    if (mobileButtons) {
        mobileButtons.classList.add('d-none');
    }
}



function startGame() {
    init();
    const startScreen = document.getElementById('startScreen');
    if (startScreen) {
        startScreen.classList.add('d-none');
    }
    const canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.classList.remove('d-none');
    }

    showMobileButtons();
}

function showStartScreen() {
    const startScreen = document.getElementById('startScreen');
    const canvas = document.getElementById('canvas');
    if (startScreen) {
        startScreen.classList.remove('d-none');
    }
    if (canvas) {
        canvas.classList.add('d-none');
    }
}

function endGame() {
    showEndScreen();
    hideMobileButtons();
}

function winGame() {
    const winScreen = document.getElementById('winScreen');
    const h1 = document.querySelector('h1');
    const h3 = document.querySelector('h3');
    if (winScreen) {
        winScreen.classList.remove('d-none');
    }
    const canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.classList.add('d-none');
    }
    if (h1) {
        h1.classList.add('d-none');
    }
    if (h3) {
        h3.classList.add('d-none');
    }
    clearAllIntervals();
    stopAllSoundsExceptWin();
    hideMobileButtons();
}

function backToMenu() {
    clearAllIntervals();
    const winScreen = document.getElementById('winScreen');
    const startScreen = document.getElementById('startScreen');
    const canvas = document.getElementById('canvas');
    const h1 = document.querySelector('h1');
    const h3 = document.querySelector('h3');
    if (winScreen) {
        winScreen.classList.add('d-none');
    }
    if (startScreen) {
        startScreen.classList.remove('d-none');
    }
    if (canvas) {
        canvas.classList.add('d-none');
    }
    if (h1) {
        h1.classList.remove('d-none');
    }
    if (h3) {
        h3.classList.remove('d-none');
    }
}

function showEndScreen() {
    const endScreen = document.getElementById('endScreen');
    const h1 = document.querySelector('h1');
    const h3 = document.querySelector('h3');
    if (endScreen) {
        endScreen.classList.remove('d-none');
    }
    const canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.classList.add('d-none');
    }
    if (h1) {
        h1.classList.add('d-none');
    }
    if (h3) {
        h3.classList.add('d-none');
    }
    stopAllSounds();
    hideMobileButtons();
}

function restartGame() {
    clearAllIntervals();
    const endScreen = document.getElementById('endScreen');
    const winScreen = document.getElementById('winScreen');
    const h1 = document.querySelector('h1');
    const h3 = document.querySelector('h3');
    if (endScreen) {
        endScreen.classList.add('d-none');
    }
    if (winScreen) {
        winScreen.classList.add('d-none');
    }
    const canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.classList.remove('d-none');
    }
    if (h1) {
        h1.classList.remove('d-none');
    }
    if (h3) {
        h3.classList.remove('d-none');
    }
    init();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
});


