class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;


constructor() {
    this.bindKeyPressEvents();
    this.bindTouchPressEvents();
}

bindKeyPressEvents() {
    window.addEventListener('keydown', (e) => {
        this.handleKeyPress(e.keyCode, true);
    });

    window.addEventListener('keyup', (e) => {
        this.handleKeyPress(e.keyCode, false);
    });
}


bindTouchPressEvents() {
    this.addTouchEvent('btnLeft', 'LEFT');
    this.addTouchEvent('btnRight', 'RIGHT');
    this.addTouchEvent('btnJump', 'UP');
    this.addTouchEvent('btnThrow', 'SPACE');
}

addTouchEvent(buttonId, action) {

    const button = document.getElementById(buttonId);

    if (button) {
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this[action] = true;
        });
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            this[action] = false;
        });
    } else {

    }
}

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
