let canvas;
let world;
let keyboard = new Keyboard();
let imagesToLoad = 0;
let imageLoaded = 0;
let percent = 0;
let gameStarted = false;
let intervalIds = [];
let fullScreenEnabled;
const imgLose = "./img/9_intro_outro_screens/game_over/you_lost.png";
const imgWin = "./img/9_intro_outro_screens/game_over/game_over.png";
let imgScr;
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
async function loadGame() {
    const restartData = await restartGame();
    await generateHTML(restartData);
    initLevel();
    initCanvas();
}

/**
 * Initializes the canvas and world objects.
 */
async function initCanvas() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Generates the HTML for the game screen.
 */
async function generateHTML(restart) {
    document.getElementById('gameScreen').innerHTML = await createHtmlForGame();

    restart && startGame();
}

/**
 * Starts the game by hiding the start screen, displaying the loading screen,
 * and showing the game canvas once the loading progress is complete.
 */
async function startGame() {
    audioManager.startGameSound();
    toggleDisplay('startScreen');  
    toggleDisplay('loadingScreen'); 
    await loadingGame();
    toggleDisplay('loadingScreen'); 
    toggleDisplay('canvasContainer'); 
    updateVolumeButtonImage();
    isMobileDevice() &&  showMobileController(true);
}


/**
 * Resets the game by clearing the canvas and world objects and resetting the game state.
 */
async function restartGame() {
    const restartData = JSON.parse(sessionStorage.getItem('restart'));
    sessionStorage.setItem('restart', JSON.stringify(false))
    return restartData;
  }
/**
 * Handles the game loading process by pausing the game,
 * displaying the loading bar, and resuming the game after loading is complete.
 */
async function loadingGame(){
    gameStarted = true;
    //world.gamePaused = true
    await loadingBar();
    world.gamePaused = false
}

/**
 * Pauses or resumes the game.
 */
function pauseGame() {
    if (!world.gamePaused) {
        togglePause(true, 'img/control/play-button.png');
        audioManager.muteGameSound(true)
    } else {
        togglePause(false, 'img/control/pause-button.png');
        audioManager.muteGameSound(false)
    }
    
}

/**
 * Toggles the game's paused state, updates the music, and changes the pause button image.
 * @param {boolean} pause - Indicates if the game should be paused.
 * @param {string} imgPath - The path to the image to set for the pause button.
 */
function togglePause(pause, imgPath) {
    let button = document.getElementById('pauseBtn');
    world.gamePaused = pause;
    button.style.backgroundImage = `url(${imgPath})`;
}

/**
 * Stops the game and displays the game over screen.
 */
function stopGame(imgSrc) {
    const gameOver = document.getElementById('gameOverScreen');
    document.getElementById('gameOver').classList.remove('d-none');
    gameOver.innerHTML = `<img class="gameOverImg" src="${imgSrc}" />`;  
    setMusic();
    showMobileController(false)
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
        return 'endbossFightSound';
    } else {
        return 'gameSound';
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
function reloadPage(restart){
    restart ? sessionStorage.setItem('restart', JSON.stringify(restart)) + window.location.reload() : window.location.reload();
};


/**
 * Sets up touch listeners for game controls.
 * @param {string} id - The ID of the button that triggered the touch event.
 */
function mobileControllerStart(id) {
    const key = touchMap[id];
    if (key) {
        keyboard[key] = true;
    }
    event.preventDefault();
}

/**
 * Handles touch end events for game controls.
 * @param {string} id - The ID of the button that triggered the touch end event.
 */
function mobileControllerEnd(id) {
    const key = touchMap[id];
    if (key) {
        keyboard[key] = false;
    }
    event.preventDefault();
}

async function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }