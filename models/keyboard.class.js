class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    
/**
 * Constructor for initializing the Keyboard class with key press and touch press event bindings.
 *
 * @return {void} No return value.
 */
constructor() {
    this.bindKeyPressEvents();
    this.bindTouchPressEvents();
}

/**
 * Binds key press events for handling key down and key up events.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
bindKeyPressEvents() {
    window.addEventListener('keydown', (e) => {
        this.handleKeyPress(e.keyCode, true);
    });
    window.addEventListener('keyup', (e) => {
        this.handleKeyPress(e.keyCode, false);
    });
}

/**
 * Binds touch press events for handling touch interactions.
 *
 */
bindTouchPressEvents() {
    this.addTouchEvent('btnLeft', 'LEFT');
    this.addTouchEvent('btnRight', 'RIGHT');
    this.addTouchEvent('btnJump', 'UP');
    this.addTouchEvent('btnThrow', 'SPACE');
}

/**
 * Adds touch event listeners to the specified button element.
 *
 * @param {string} buttonId - The id of the button element.
 * @param {string} action - The action associated with the button.
 */

addTouchEvent(buttonId, action) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('touchstart', (e) => {
            if (e.cancelable) e.preventDefault();
            this[action] = true;
        }, { passive: false });
        button.addEventListener('touchend', (e) => {
            if (e.cancelable) e.preventDefault();
            this[action] = false;
        }, { passive: false });
    } else {
        console.warn(`Button with ID ${buttonId} not found.`);
    }
}


/**
 * Handles key press events to update the direction flags based on the keyCode.
 *
 * @param {number} keyCode - The key code of the pressed key.
 * @param {boolean} isPressed - Flag indicating if the key is pressed or released.
 */
handleKeyPress(keyCode, isPressed) {
    switch (keyCode) {
        case 37:
            this.LEFT = isPressed;
            break;
        case 39:
            this.RIGHT = isPressed;
            break;
        case 32:
            this.SPACE = isPressed;
            break;
        case 38:
            this.UP = isPressed;
            break;
        }
    }
}
