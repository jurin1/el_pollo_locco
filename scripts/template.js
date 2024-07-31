async function createHtmlForGame() {
    return `
            <svg id="termsOpen" onclick="terms(this.id)" class="infoSvg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        <div id="loadingScreen" class="d-none fade">
            <img class="loadingImg" src="./img/loading/mexican-hat.png" alt="">
            <div class="loadingStatus blink">LOADING...</div>
            <div class="loadingBar">
                <div class="progressBar" id="progressBar">0%</div>
            </div>
        </div>
        <div id="startScreen" class="fade show">
            <div class="btnContainer">
                <button onclick="startGame()" class="btnStyle">Start</button>
                <button onclick="controllerInfo('gameInfoContainer')" class="btnStyle">Control</button>
            </div>
            <div id="gameInfoContainer" class="d-none infoWindowStyle" onclick="controllerInfo('gameInfoContainer')"></div>
        </div>
        <div id="gameOver" class="d-none">
                <img id="gameOverScreen" class="gameOverImg" src="./img/9_intro_outro_screens/game_over/game_over.png">
                <button onclick="reloadPage(true)" class="restartBtn">Restart the game</button>
                <button onclick="reloadPage(false)" class="restartBtn">Back to menu</button>
        </div>
        <div id="canvasContainer" class="d-none fade">
            <div id="ingameControl">
                <button class="ingameControlBtn" id="pauseBtn" onclick="pauseGame()"></button>
                <button class="ingameControlBtn" id="infoIngameBtn"
                    onclick="controllerInfo('ingameInfoContainer')"></button>
                <button class="ingameControlBtn" id="volumeBtn" onclick="muteSound()"></button>
                <button class="ingameControlBtn" id="fullScreenBtn" onclick="toggleFullscreen()"></button>
            </div>
            <div 
                id="ingameInfoContainer" class="d-none infoWindowStyle" onclick="controllerInfo('ingameInfoContainer')">
            </div>
            <div id="mobileController" class='d-none'>
                <div class="mobileLeftBtn">
                    <button id="leftKey" class="mobileBtn" ontouchstart="mobileControllerStart(this.id)" ontouchend="mobileControllerEnd(this.id)">
                        <img src="/img/control/mobile_btn_left.svg">
                    </button>
                    <button id="rightKey" class="mobileBtn" ontouchstart="mobileControllerStart(this.id)" ontouchend="mobileControllerEnd(this.id)">
                        <img src="/img/control/mobile_btn_right.svg">
                    </button>
                </div>
                <div class="mobileRightBtn">
                    <button id="jumpKey" class="mobileBtn" ontouchstart="mobileControllerStart(this.id)" ontouchend="mobileControllerEnd(this.id)">
                        <img src="/img/control/mobile_btn_jump.svg">
                    </button>
                    <button id="throwKey" class="mobileBtn" ontouchstart="mobileControllerStart(this.id)" ontouchend="mobileControllerEnd(this.id)">
                        <img src="/img/control/mobile_btn_throw.svg">
                    </button>
                </div>
            </div>
            <canvas class="" id="canvas" width="720px" height="480px"></canvas>
        </div>
        <div id="terms" class="d-none" onclick="doNotClose(event)">
        <button id="termsClose" onclick="terms(this.id)" class="closeBtnStyle"></button>
        <a href="./templates/legal_notice.html"><button class="btnStyle attributeBtn">Legal Notice</button></a>
        <a href="./templates/privacy_policy.html"><button class="btnStyle attributeBtn">Privacy Policy</button></a>
        <button class="btnStyle attributeBtn" onclick="createLicenseInfo('licenseContainer')">License Information</button>

    </div>
    `;
}


function controlerInfo(id) {
    return `
        <div id="gameInfo" onclick="doNotClose(event)">
            <button onclick="controllerInfo('${id}')" class="closeBtnStyle"></button>
            <div class="controlContainer" style="margin-top: -34px !important;">
                <img class="controllerImg" src="./img/control/keyboard.svg" alt="" style="width: 100px !important">
                <span style="margin-top: -16px !important;">walk/jump</span>
            </div>
            <div class="controlContainer">
                <img class="controllerImg" src="./img/control/D.svg" alt="">
                <span>Power throw</span>
            </div>
            <div class="controlContainer">
                <img class="controllerImg" src="./img/control/F.svg" alt="">
                <span>short throw</span>
            </div>
        </div>
    `;
}

function controlerInfoMobile(id) {
    return `
        <div id="gameInfo" onclick="doNotClose(event)">
            <button onclick="controllerInfo('${id}')" class="closeBtnStyle"></button>
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


function licenseInfo(id) {
    return `
        <div class="linkWindow" onclick="doNotClose(event)">
            <button onclick="createLicenseInfo('${id}')" class="closeBtnStyle"></button>
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