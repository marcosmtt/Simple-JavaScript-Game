let canvas;
let ctx; //Context
let HEIGHT, WIDTH;
let frames = 0;

let ground = {
    //This variable is used to create the game ground
    sizeY: 550,
    height: 50,
    color: "#803300",

    draw: function () { //método
        ctx.fillStyle = this.color;
        ctx.fillRect(0, this.sizeY, WIDTH, this.height);
    }

};

let character = {
    //Set basic character parameters and functions
    x: 50,
    y: 0,
    height: 50,
    width: 50,
    color: "#ff4e4e",

    //Adding some physics:
    gravity: 0.8,
    speed: 1.2,
    jumpForce: 15,

    update: function () {
        this.speed += this.gravity;
        this.y += this.speed;

        if (this.y >= ground.sizeY - this.height) {
            this.y = ground.sizeY - this.height;
        }
    },

    jump: function () {
        this.speed = -this.jumpForce;
    },

    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.height, this.width);
    }
};


function click(event) {
    character.jump();
}

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

function run() {
    update();
    draw();

    window.requestAnimationFrame(run);
}

function update() {
    frames++;
    character.update();
}

function draw() {
    ctx.fillStyle = "#66c2ff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ground.draw();
    character.draw();
}

//inicializa o jogo
main();

