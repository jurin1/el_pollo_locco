let canvas;
let world;
let keyboard = new Keyboard();
let imagesToLoad = 0;
let imageLoaded = 0;
let percent = 0;
let gameStarted = false;
let intervalIds = [];
let fullScreenEnabled;
const audioManager = new AudioManager();
const keyMap = {
    'ArrowUp': 'UP',
    'ArrowDown': 'DOWN',
    'ArrowRight': 'RIGHT',
    'ArrowLeft': 'LEFT',
    'd': 'D',
    'f': 'F'
};

const touchMap = {
    'rightKey': 'RIGHT',
    'leftKey': 'LEFT',
    'jumpKey': 'UP',
    'throwKey': 'D'
};

/**
 * Loads the game, optionally restarting it.
 * @param {boolean} newStart - Indicates if the game should be restarted.
 */
async function loadGame(newStart) {
    if (newStart) resetGame();
    await generateHTML();
    audioManager.playAudio('gameSound');
    initLevel();
    init();
    await adjustMobileControlerDisplay();
}

/**
 * Initializes the canvas and world objects.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Generates the HTML for the game screen.
 */
async function generateHTML() {
    document.getElementById('gameScreen').innerHTML = createHtmlForGame();
}

/**
 * Starts the game by toggling the display and updating the volume button image.
 */
function startGame() {
    toggleDisplay('canvasContainer', 'remove');
    gameStarted = true;
    toggleDisplay('startScreen', 'add');
    updateVolumeButtonImage();
}

/**
 * Pauses or resumes the game.
 */
function pauseGame() {
    if (!world.gamePaused) {
        togglePause(true, '', 'img/control/play-button.png');
    } else {
        togglePause(false, gameSound(), 'img/control/pause-button.png');
    }
}

/**
 * Toggles the game's paused state, updates the music, and changes the pause button image.
 * @param {boolean} pause - Indicates if the game should be paused.
 * @param {string} sound - The sound to play.
 * @param {string} imgPath - The path to the image to set for the pause button.
 */
function togglePause(pause, sound, imgPath) {
    let button = document.getElementById('pauseBtn');
    world.gamePaused = pause;
    setMusic(sound);
    button.style.backgroundImage = `url(${imgPath})`;
}

/**
 * Stops the game and displays the game over screen.
 */
function stopGame() {
    document.getElementById('gameOver').classList.remove('d-none');
    setMusic();
}

/**
 * Sets the background music.
 * @param {string} music - The music to play.
 */
function setMusic(music) {
    audioManager.pauseAllAudios();
    if (music) {
        audioManager.playAudio(music);
    }
}

/**
 * Returns the appropriate game sound based on the game state.
 * @returns {string} The game sound to play.
 */
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
    updateVolumeButtonImage();
}

/**
 * Resets the game by clearing the canvas and world objects and resetting the game state.
 */
function resetGame() {
    canvas = null;
    world = null;
    gameStarted = false;
}

/**
 * Updates the volume button image based on the mute state.
 */
function updateVolumeButtonImage() {
    const volumeBtn = document.getElementById('volumeBtn');
    const isMuted = localStorage.getItem('soundMuted') === 'true';
    volumeBtn.style.backgroundImage = isMuted
        ? 'url(../img/control/sound-off.png)'
        : 'url(../img/control/sound-on.png)';
}




// KEYBOARD LISTENERS

window.addEventListener('keydown', (e) => {
    const key = keyMap[e.key];
    if (key) {
        keyboard[key] = true;
    }
});


window.addEventListener('keyup', (e) => {
    const key = keyMap[e.key];
    if (key) {
        keyboard[key] = false;
    }
});


// Reload the page after the game is over
function reloadPage(){
    window.location.reload();
};


/**
 * Sets up touch listeners for game controls.
 * @param {string} id - The ID of the button that triggered the touch event.
 */
function mobileControlerStart(id) {
    const key = touchMap[id];
    if (key) {
        keyboard[key] = true;
    }
}

/**
 * Handles touch end events for game controls.
 * @param {string} id - The ID of the button that triggered the touch end event.
 */
function mobileControlerEnd(id) {
    const key = touchMap[id];
    if (key) {
        keyboard[key] = false;
    }
}

/**
 * Checks if the current device is a mobile device.
 * @returns {boolean} True if the device is a mobile device, otherwise false.
 */
function isMobileDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /mobile|android|iphone|ipad|iemobile|opera mini/i.test(userAgent);
}

/**
 * Adjusts the display of the mobile controler based on the device type.
 * Displays the controler if the device is mobile, hides it otherwise.
 */
function adjustMobileControlerDisplay() {
    const mobileControler = document.getElementById('mobileControler');
    if (isMobileDevice()) {
        mobileControler.classList.remove('d-none');
        toggleFullscreen();
    } else {
        mobileControler.classList.add('d-none');
    }
}

// Event listener for window resize to adjust mobile controler display
window.addEventListener('resize', adjustMobileControlerDisplay);

// Initial call to adjustMobileControlerDisplay function
adjustMobileControlerDisplay();

