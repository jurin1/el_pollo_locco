const SHORT_DELAY = 300;
const MEDIUM_DELAY = 1000;
const LONG_DELAY = 2000;




/**
 * Adds or removes the 'd-none' class to toggle the display of an element.
 * @param {string} id - The ID of the element to modify.
 */
function toggleDisplay(id) {
    const element = document.getElementById(id);
    if (element.classList.contains('fade') && element.classList.contains('show')) {
        element.classList.remove('show');
        element.classList.add('d-none');
    } else {
        element.classList.remove('d-none');
        element.classList.add('show');
        }
}



/**
 * Animates the loading bar to fill from 0% to 100% in steps,
 * resolving the promise when the loading is complete.
 * @returns {Promise<void>} Resolves when the loading bar reaches 100%
 */
async function loadingBar(){
    const progressBar = document.getElementById('progressBar');
    let width = 0;

    return new Promise((resolve) => {
        const interval = setInterval(function() {
            if (width >= 100) {
                clearInterval(interval);
                resolve();  // close the Promise if the progress bar contains 100%
            } else {
                width += 25;
                progressBar.style.width = width + '%';
                progressBar.textContent = width + '%';
            }
        }, 1000);
    });
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
function controllerInfo(id) {
    const element = document.getElementById(id);
    
    element.classList.toggle('d-none');
    element.classList.toggle('fadeIn');
    if(gameStarted && !world.gamePaused){pauseGame();}
    element.innerHTML = isMobileDevice() ? controlerInfoMobile(id) : controlerInfo(id);
}

function createLicenseInfo(id){
    const element = document.getElementById(id);
    
    element.classList.toggle('d-none');
    element.classList.toggle('fadeIn');

    element.innerHTML = isMobileDevice() ? terms("close") + licenseInfo(id) : licenseInfo(id)
}

/**
 * Sets a stoppable interval by executing a function repeatedly at a specified time interval.
 * @param {function} fn - The function to execute at each interval.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Stops all intervals that were created using setStoppableInterval.
 */
async function stopAllIntervals() {
    intervalIds.forEach(clearInterval); // Iteriere über alle Intervall-IDs und stoppe sie
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
    if (fullScreenEnabled) {
        enterFullscreen(element)
        button.style.backgroundImage = `url('img/control/resize.png')`;
    } else {
        exitFullscreen()
        button.style.backgroundImage = `url('img/control/expand.png')`;
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
 * Exits fullscreen mode if the browser is in fullscreen.
 * This function checks if there is a fullscreen element and 
 * calls the appropriate method to exit fullscreen mode.
 * Browser prefix support is also considered.
 */
function exitFullscreen() {
    if (document.fullscreenElement || document.webkitIsFullScreen) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

/**
 * Shows or hides the "terms" element based on the provided ID parameter.
 * If the ID contains the term 'close', the element will be hidden and the game will be paused.
 * Otherwise, the element will be shown and the game will also be paused.
 *
 * @param {string} id - The ID that determines whether the element should be shown or hidden.
 *                      If 'close' is included in the ID, the element will be hidden.
 */
function terms(id) {
    let element = document.getElementById('terms').classList;
    const closeterms = id.toLowerCase().includes('close');
    const showTerms = element.remove('d-none');
    const gameStarted = checkGameStarted();

    if (closeterms) {
        element.add('d-none');
        if(gameStarted){pauseGame();}
    } else {
        showTerms;
        if(gameStarted && !world.gamePaused){pauseGame();}

    }
}

/**
 * This function checks if the game has started and is not currently paused.
 * If both conditions are true, it returns true. Otherwise, it returns false.
 */
function checkGameStarted(){
    if(gameStarted && !world.gamePaused){
        return true;
    } else {
        return false
    }
}

/**
 * Updates the volume button image based on the mute state.
 */
function updateVolumeButtonImage() {
    const volumeBtn = document.getElementById('volumeBtn');
    const isMuted = localStorage.getItem('soundMuted') === 'true';
    
    if (isMuted) {
        audioManager.muteGameSound(true);
        volumeBtn.style.backgroundImage = 'url(../img/control/sound-off.png)';
    } else {
        audioManager.muteGameSound(false);
        volumeBtn.style.backgroundImage = 'url(../img/control/sound-on.png)';
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
 * Displays the mobile controller by removing the 'd-none' class from it.
 * This function is intended to make the mobile controller visible.
 */
function showMobileController() {
    document.getElementById('mobileController').classList.remove('d-none');
}

/**
 * Handles the window resize event to check if the device is a mobile device
 * and displays or hides the mobile controller accordingly.
 * This function is called whenever the window is resized.
 *
 * @listens window#resize
 */
function handleResize() {
    if (isMobileDevice() && !world.isGameOver) {
        showMobileController();
    } else {
        const mobileController = document.getElementById('mobileController');
        if (mobileController) {
            mobileController.classList.add('d-none');
        }
    }
}

// Add an event listener to the window resize event
window.addEventListener('resize', handleResize);

