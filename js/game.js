let canvas;
let world;
let keyboard = new Keyboard();



function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function init() {

    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    bindButtons();
   
}

function startButton(){
    document.getElementById('startScreenID').classList.add('d-none');
    init()
}

function gameOverScreen(){
    document.getElementById('gameOverID').classList.add('d-inline');
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
        keyboard.SPACE = true;
    });

    document.getElementById('throwButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
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
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
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
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
});