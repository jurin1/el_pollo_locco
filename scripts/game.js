let canvas;
let world;
let keyboard = new Keyboard();
let imagesToLoad = 0;
let imageLoaded = 0;
let percent = 0;
let gameStarted = false;
let intervalIds = [];
let fullScreenEnabled = false;
const audioManager = new AudioManager();




async function loadGame(newStart) {
    loadSettings();
    if (newStart) resetGame();
    await generateHTML();
    // audioManager.playAudio('gameSound');
    setupTouchListeners();
    initLevel();
    init();
}


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


async function generateHTML() {
    document.getElementById('gameScreen').innerHTML = createHtmlForGame();
}


function startGame() {
    toggleDisplay('canvasContainer', 'remove');
    gameStarted = true;
    toggleDisplay('starScreen', 'add')
    pauseGame()
}


function pauseGame() {
    if (!world.gamePaused) {
        togglePause(true, '', 'img/control/play-button.png');
    } else {
        togglePause(false, this.gameSound(), 'img/control/pause-button.png')
    }
}


function togglePause(pause, sound, imgPath) {
    let button = document.getElementById('pauseBtn');
    world.gamePaused = pause;
    setMusic(sound);
    button.style.backgroundImage = `url(${imgPath})`;
}


function stopGame() {
    document.getElementById('gameOver').classList.remove('dnone');
    setMusic();
    saveSettings();
}


function setMusic(music) {
    audioManager.pauseAllAudios()
    if (music) {
        audioManager.playAudio(music);
    }
}


function gameSound() {
    if (world.endbossFight) {
        return 'endBossFight_sound';
    } else {
        return 'gameMusic_sound';
    }
}


/**
 * Toggles the sound mute state and stores it in local storage.
 */
function muteSound() {
    let soundMuted = JSON.parse(localStorage.getItem('soundMuted')) || false;
    localStorage.setItem('soundMuted', !soundMuted);
}

function resetGame() {
    canvas = null;
    world = null;
    gameStarted = false;
}



function setupTouchListeners() {
    document.getElementById('canvas').addEventListener('touchstart', (e) => {
        e.preventDefault();
    });
    attachTouchListenersToButton('leftKey', 'LEFT');
    attachTouchListenersToButton('rightKey', 'RIGHT');
    attachTouchListenersToButton('jumpKey', 'UP');
    attachTouchListenersToButton('throwKey', 'D');
    attachTouchListenersToButton('shortThrowKey', 'F');
}


function attachTouchListenersToButton(buttonId, keyboardKey) {
    const buttonElement = document.getElementById(buttonId);
    buttonElement.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[keyboardKey] = true;
    });
    buttonElement.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[keyboardKey] = false;
    });
}

// KEYBOARD LISTENER


window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowUp') {
        keyboard.UP = true;
    }
    if (e.key == 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.key == 'd') {
        keyboard.D = true;
    }
    if (e.key == 'f') {
        keyboard.F = true;
    }
});


window.addEventListener('keyup', (e) => {
    if (e.key == 'ArrowUp') {
        keyboard.UP = false;
    }
    if (e.key == 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.key == 'd') {
        keyboard.D = false;
    }
    if (e.key == 'f') {
        keyboard.F = false;
    }
});