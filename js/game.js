let canvas;
let ctx; //ctx steht für context

let world = new World();




function init(){
    canvas= document.getElementById('canvas');
    ctx=canvas.getContext('2d');

    console.log("My Char is,", world.character);
}