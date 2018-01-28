let canvas;
let ctx; //Context
let HEIGHT, WIDTH;
let frames = 0;

function main() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    if (HEIGHT >= 500) {
        HEIGHT = 600;
        WIDTH = 800;
    }

    //set canvas size
    canvas = document.createElement("canvas");
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    canvas.style.border = "2px solid #000";

    ctx = canvas.getContext("2d");

    //Add the Canvas variable to html body
    document.body.appendChild(canvas);

    document.addEventListener("mousedown", click);

}

function click(event) {
    alert("clicou");
}

function run() { }

function update() { }

function draw() { }

//inicializa o jogo
main();

