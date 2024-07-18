let canvas;
let world;
let keyboard = new Keyboard();
let soundMute = true;
let button = true;
let background_Sound = new Audio('audio/backgroundMusic.mp3');
background_Sound.volume=0.3;
let backgroundIsPlaying=true;
function muteSounds() {
    
    // soundMute = soundMute ? false : true;
    // soundMute = !soundMute;
    let buttonImage = document.querySelector('#soundButton img');
    if (soundMute && backgroundIsPlaying) {
        background_Sound.muted = false;
        soundMute = false;
        buttonImage.src = 'img/design/soundON.png';
    } else {
        background_Sound.muted = true;
        soundMute = true;
        buttonImage.src = 'img/design/soundOFF.png';
    }
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreenID');
    enterFullscreen(fullscreen);
}

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
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);

}

function init() {

    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    bindButtons();
    musik();

}
function musik(){
    if (soundMute) {
        background_Sound.muted = true;
    } else {
        background_Sound.muted = false;
        background_Sound.play().then(()=>{
            backgroundIsPlaying =true;
        });
    }
}


    function manuel() {
        if (button) {
            document.getElementById('elManuelID').classList.add('d-inline');
            document.getElementById('elManuelID').classList.remove('d-none');
        } else {
            document.getElementById('elManuelID').classList.add('d-none');
            document.getElementById('elManuelID').classList.remove('d-inline');
        }
        button = !button;
    }

    function bindButtons() {

        document.getElementById('leftButton').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.LEFT = true;
        });

        document.getElementById('leftButton').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.LEFT = false;
        });
        document.getElementById('rightButton').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.RIGHT = true;
        });

        document.getElementById('rightButton').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.RIGHT = false;
        });
        document.getElementById('upButton').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.UP = true;
        });

        document.getElementById('upButton').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.UP = false;
        });
        document.getElementById('throwButton').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.D = true;
        });

        document.getElementById('throwButton').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.D = false;
        });
    }



    window.addEventListener("keydown", (event) => {
        if (event.keyCode == 39) {
            keyboard.RIGHT = true;
        }
        if (event.keyCode == 37) {
            keyboard.LEFT = true;
        }
        if (event.keyCode == 38) {
            keyboard.UP = true;
        }
        if (event.keyCode == 40) {
            keyboard.DOWN = true;
        }
        if (event.keyCode == 68) {
            keyboard.D = true;
        }

    });

    window.addEventListener("keyup", (event) => {
        if (event.keyCode == 39) {
            keyboard.RIGHT = false;
        }
        if (event.keyCode == 37) {
            keyboard.LEFT = false;
        }
        if (event.keyCode == 38) {
            keyboard.UP = false;
        }
        if (event.keyCode == 40) {
            keyboard.DOWN = false;
        }
        if (event.keyCode == 68) {
            keyboard.D = false;
        }
    });