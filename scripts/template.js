function createHtmlForGame() {
    return `
        <div id="loadingScreen" class="d-none">
            <img class="loadingImg" src="./img/loading/mexican-hat.png" alt="">
            <div class="loadingStatus">LOADING...</div>
        </div>
        <div id="startScreen" class="">
            <div class="btnContainer">
                <button onclick="startGame()" class="btnStyle">Start</button>
                <button onclick="toggleInfo('gameInfoContainer')" class="btnStyle">Control</button>
            </div>
            <div id="gameInfoContainer" class="d-none infoWindowStyle" onclick="toggleInfo('gameInfoContainer')"></div>
        </div>
        <div id="gameOver" class="d-none">
            <img class="gameOverImg" src="./img/9_intro_outro_screens/game_over/game over.png">
            <button onclick="reloadPage()" class="restartBtn">Back to menu</button>
        </div>
        <div id="canvasContainer" class="d-none">
            <div id="ingameControl">
                <button class="ingameControlBtn" id="pauseBtn" onclick="pauseGame()"></button>
                <button class="ingameControlBtn" id="infoIngameBtn"
                    onclick="toggleInfo('ingameInfoContainer')"></button>
                <button class="ingameControlBtn" id="volumeBtn" onclick="muteSound()"></button>
                <button class="ingameControlBtn" id="fullScreenBtn" onclick="toggleFullscreen()"></button>
            </div>
            <div 
                id="ingameInfoContainer" class="d-none infoWindowStyle" onclick="toggleInfo('ingameInfoContainer')">
            </div>
            <div id="mobileControler">
                <div class="mobileLeftBtn">
                    <button id="leftKey" class="mobileBtn" ontouchstart="mobileControlerStart(this.id)" ontouchend="mobileControlerEnd(this.id)">
                        <img src="/img/control/mobile_btn_left.svg">
                    </button>
                    <button id="rightKey" class="mobileBtn" ontouchstart="mobileControlerStart(this.id)" ontouchend="mobileControlerEnd(this.id)">
                        <img src="/img/control/mobile_btn_right.svg">
                    </button>
                </div>
                <div class="mobileRightBtn">
                    <button id="jumpKey" class="mobileBtn" ontouchstart="mobileControlerStart(this.id)" ontouchend="mobileControlerEnd(this.id)">
                        <img src="/img/control/mobile_btn_jump.svg">
                    </button>
                    <button id="throwKey" class="mobileBtn" ontouchstart="mobileControlerStart(this.id)" ontouchend="mobileControlerEnd(this.id)">
                        <img src="/img/control/mobile_btn_throw.svg">
                    </button>
                </div>
            </div>
            <canvas class="" id="canvas" width="720px" height="480px"></canvas>
        </div>
    `;
}


function controlerInfo(id) {
    return `
        <div id="gameInfo" onclick="doNotClose(event)">
            <button onclick="toggleInfo('${id}')" class="closeBtnStyle"></button>
            <div class="controlContainer">
                <img class="controllerImg" src="./img/control/arrows.png" alt="">
                <span>walk/jump</span>
            </div>
            <div class="controlContainer">
                <img class="controllerImg" src="./img/control/key-d-of-a-keyboard.png" alt="">
                <span>Power throw/<br>right bottle</span>
            </div>
            <div class="controlContainer">
                <img class="controllerImg" src="./img/control/keyboard-key-f.png" alt="">
                <span>short throw/<br>left bottle</span>
            </div>
        </div>
    `;
}

function controlerInfoMobile(id) {
    return `
        <div id="gameInfo" onclick="doNotClose(event)">
            <button onclick="toggleInfo('${id}')" class="closeBtnStyle"></button>
            <div class="controlContainer">
                <img class="svgControler" src="/img/control/mobile_btn_left.svg">
                <span>walk<br>left</span>
            </div>
            <div class="controlContainer">
                <img class="svgControler" src="/img/control/mobile_btn_right.svg">
                <span>walk<br>right</span>
            </div>
            <div class="controlContainer">
                <img class="svgControler" src="/img/control/mobile_btn_jump.svg">
                <span>jump<br>Pepe</span>
            </div>
            <div class="controlContainer">
                <img class="svgControler" src="/img/control/mobile_btn_throw.svg">
                <span>throw<br>bottle</span>
            </div>
        </div>
    `;
}


function createHtmlForLicense(id) {
    return `
        <div class="linkWindow" onclick="doNotClose(event)">
            <button onclick="toggleInfo('${id}')" class="closeBtnStyle"></button>
            <ul>
                <li>
                    <a class="attributeLinkStyle" href="https://game-icons.net/1x1/guard13007/play-button.html"
                        title="Play Button">Play Button created by guard13007</a>
                </li>
                <li>
                    <a class="attributeLinkStyle" href="https://game-icons.net/1x1/guard13007/pause-button.html"
                        title="Pause Button">Pause Button created by guard13007</a>
                </li>
                <li>
                    <a class="attributeLinkStyle" href="https://game-icons.net/1x1/delapouite/sound-off.html"
                        title="Sound off Button">Sound off Button created by delapouite</a>
                </li>                
                <li>
                    <a class="attributeLinkStyle" href="https://game-icons.net/1x1/delapouite/sound-on.html"
                        title="Sound on Button">Sound on Button created by delapouite</a>
                </li>
                <li>
                    <a class="attributeLinkStyle" href="https://game-icons.net/1x1/delapouite/expand.html"
                        title="Expand Button">Expand Button created by delapouite</a>
                </li>            
                <li>
                    <a class="attributeLinkStyle" href="https://game-icons.net/1x1/delapouite/contract.html
                        title="Resize Button">Resize Button created by delapouite</a>
                </li>
                <li>
                    <a class="attributeLinkStyle" href="https://game-icons.net/1x1/delapouite/joystick.html" 
                        title="Joystick Button">Joystick Button created by delapouite</a>
                </li>               
                <li>
                    <a class="attributeLinkStyle" href="https://www.flaticon.com/free-icon/rotate_2313593?term=rotation&related_id=2313593" 
                        title="Rotate Icon">Rotate Icon created by Pixel perfect</a>
                </li>                
                <li>
                    <a class="attributeLinkStyle" href="https://iconscout.com/contributors/iconika" 
                        title="Mobile Buttons">Mobile Buttons created by Iconika perfect</a>
                </li>                
                <li>
                    <a class="attributeLinkStyle" href="https://developerakademie.com/" 
                        title="Images">Images created by Developer Akademie</a>
                </li>
            </ul>
        </div>
    `;
}