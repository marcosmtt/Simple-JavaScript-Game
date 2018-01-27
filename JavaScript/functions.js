let canvas;
let ctx;
let HEIGHT, WIDTH;
let frames = 0;

function main() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    if (HEIGHT >= 500) {
        HEIGHT = 600;
        WIDTH = 800;
    }

    canvas = document.createElement("canvas");
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    canvas.style.border = "2px solid #000";

}

function click() { }

function run() { }

function update() { }

function draw() { }

//inicializa o jogo
main();