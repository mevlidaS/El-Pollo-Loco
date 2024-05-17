let canvas;
let  world;
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the level, creating the game world, updating sounds, and sound button icon.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, endGame, winGame);
    updateAllSounds();
    updateSoundButtonIcon();
}

/**
 * Shows mobile buttons based on window size.
 */
function showMobileButtons() {
    if (window.innerWidth <= 720 || window.innerHeight <= 480) {
        const mobileButtons = document.getElementById('mobileButtons');
        if (mobileButtons) {
            mobileButtons.classList.remove('d-none');
        }
    }
}

/**
 * Hides the mobile buttons by adding the 'd-none' class if the mobileButtons element exists.
 *
 */
function hideMobileButtons() {
    const mobileButtons = document.getElementById('mobileButtons');
    if (mobileButtons) {
        mobileButtons.classList.add('d-none');
    }
}

/**
 * Shows the imprint element by removing the 'd-none' class.
 *
 */
function showImprint() {
    document.getElementById('imprint').classList.remove('d-none');
}

/**
 * Hides the imprint element by adding the 'd-none' class.
 *
 * @return {void} No return value
 */
function hideImprint() {
    document.getElementById('imprint').classList.add('d-none');
}

/**
 * Shows how to play by removing the 'd-none' class from the 'howToPlay' element.
 *
 * @return {void} No return value
 */
function showHowToPlay() {
    document.getElementById('howToPlay').classList.remove('d-none');
}

/**
 * Hides the howToPlay element by adding the 'd-none' class.
 *
 */
function hideHowToPlay() {
    document.getElementById('howToPlay').classList.add('d-none');
}

/**
 * Function to start the game by initializing, hiding the start screen, showing the canvas, and displaying mobile buttons.
 *
 * @return {void} No return value
 */
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

/**
 * Function to show the start screen by updating the CSS classes of the startScreen and canvas elements.
 *
 */
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

/**
 * Function to end the game by showing the end screen and hiding the mobile buttons.
 *
 */
function endGame() {
    showEndScreen();
    hideMobileButtons();
}

/**
 * Function to show the end screen by updating the display elements and hiding specific elements.
 *
 */
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

/**
 * Function to handle the win game scenario by updating the display elements, clearing intervals, and stopping sounds except for the win sound.
 *
 */
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

/**
 * Function to handle going back to the menu screen by clearing intervals and updating the display elements.
 *
 */
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

/**
 * Restart the game by clearing intervals, updating screen elements, and showing the canvas.
 *
 * @return {void} No return value
 */
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
    showMobileButtons();
}

/**
 * Clears all intervals up to 9999.
 *
 * @param {void} No parameters.
 * @return {void} No return value
 */
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


