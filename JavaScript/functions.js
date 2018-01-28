let canvas;
let ctx; //Context
let HEIGHT, WIDTH;
let frames = 0;

function main() {
    WIDTH = window.innerWidth; //Largura
    HEIGHT = window.innerHeight;//Altura

    if (HEIGHT >= 500) {
        WIDTH = 800;
        HEIGHT = 600;
    }

    //set canvas size
    canvas = document.createElement("canvas");
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    canvas.style.border = "5px solid #300";

    ctx = canvas.getContext("2d");

    //Add the Canvas variable to html body
    document.body.appendChild(canvas);
    document.addEventListener("mousedown", click);

    run();
}

function click(event) {
    alert("clicou");
}

function run() {
    update();
    draw();

    window.requestAnimationFrame(run);
}

function update() { 
    frames++;
}

function draw() {
    ctx.fillStyle = "#66c2ff";
    ctx.fillRect(0,0, WIDTH, HEIGHT);
 }

//inicializa o jogo
main();

