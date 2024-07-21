const SHORT_DELAY = 300;
const MEDIUM_DELAY = 1000;
const LONG_DELAY = 2000;




/**
 * Adds or removes the 'd-none' class to toggle the display of an element.
 * @param {string} id - The ID of the element to modify.
 * @param {string} actionType - The type of action to perform ('add' to hide, 'remove' to show).
 */
function toggleDisplay(id, actionType) {
    if (actionType == 'add') {
        document.getElementById(id).classList.add('d-none');
    } else {
        document.getElementById(id).classList.remove('d-none');
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
function controllerInfo(id) {
    const element = document.getElementById(id);
    const isInfo = id.toLowerCase().includes('info');
    
    element.classList.toggle('d-none');
    element.classList.toggle('fadeIn');

    element.innerHTML = isMobileDevice() ? controlerInfoMobile(id) : controlerInfo(id);
}

function createLicenseInfo(id){
    const element = document.getElementById(id);
    
    element.classList.toggle('d-none');
    element.classList.toggle('fadeIn');

    element.innerHTML = isMobileDevice() ? mobileTerms("close") + licenseInfo(id) : licenseInfo(id)
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

function exitFullscreen() {
    if (document.fullscreenElement || document.webkitIsFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  function mobileTerms(id) {
    let element = document.getElementById('mobileTerms');
    const closeMobileTerms = id.toLowerCase().includes('close');

    if(closeMobileTerms){
        element.classList.add('d-none');
    } else {
        element.classList.remove('d-none');
    }
  }