const SHORT_DELAY = 300;
const MEDIUM_DELAY = 1000;
const LONG_DELAY = 2000;




/**
 * Adds or removes the 'dnone' class to toggle the display of an element.
 * @param {string} id - The ID of the element to modify.
 * @param {string} actionType - The type of action to perform ('add' to hide, 'remove' to show).
 */
function toggleDisplay(id, actionType) {
    if (actionType == 'add') {
        document.getElementById(id).classList.add('dnone');
    } else {
        document.getElementById(id).classList.remove('dnone');
    }
}

/**
 * Sets a delay before executing a function.
 * @param {function} fn - The function to execute after the delay.
 * @param {number} time - The delay time in milliseconds.
 */
function setDelay(fn, time) {
    setTimeout(fn, time);
}

/**
 * Toggles the visibility of an element and applies fade-in animation.
 * @param {string} id - The ID of the element.
 */
function toggleInfo(id) {
    document.getElementById(id).classList.toggle('dnone');
    document.getElementById(id).classList.toggle('fadeIn');
    if (id.toLowerCase().includes('info')) {
        document.getElementById(id).innerHTML = createHtmlForInfo(id);
    } else {
        document.getElementById(id).innerHTML = createHtmlForLicense(id);
    }
}



// /**
//  * Performs pre-sound settings by muting or unmuting sounds and updating the volume button appearance.
//  */
// function preSoundSetting() {
//     let button = document.getElementById('volumeBtn');
//     let objects = [world.character, ...world.level.enemies, world];
//     objects.forEach(obj => {
//         for (let key in obj) {
//             if (key.toLowerCase().includes('sound')) {
//                 obj[key].muted = soundMuted;
//                 button.style.backgroundImage = `url('img/control/volume${soundMuted ? "-mute" : ""}.png')`;
//             }
//         }
//     });
// }

/**
 * Sets a stoppable interval by executing a function repeatedly at a specified time interval.
 * @param {function} fn - The function to execute at each interval.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopInterval(intervalId) {
    clearInterval(intervalId); // Stoppe das Intervall mit der angegebenen ID
    // Entferne die ID aus dem Array
    let index = intervalIds.indexOf(intervalId);
    if (index !== -1) {
        intervalIds.splice(index, 1);
    }
}

/**
 * Stops all intervals that were created using setStoppableInterval.
 */
function stopAllIntervals() {
    intervalIds.forEach(stopInterval); // Iteriere über alle Intervall-IDs und stoppe sie
    intervalIds = []; // Lösche das Array der Intervall-IDs
}


/**
 * Prevents an event from propagating further.
 * @param {Event} event - The event to prevent from propagating.
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * Toggles fullscreen mode for the game screen.
 */
function toggleFullscreen() {
    fullScreenEnabled = !fullScreenEnabled;
    let element = document.getElementById('gameScreen');
    let button = document.getElementById('fullScreenBtn');
    if (!fullScreenEnabled) {
        enterFullscreen(element)
        button.style.backgroundImage = `url('img/control/normalscreen.png')`;
    } else {
        exitFullscreen()
        button.style.backgroundImage = `url('img/control/fullscreen.png')`;
    }
}

/**
 * Enters fullscreen mode for an element.
 * @param {HTMLElement} element - The element to enter fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

