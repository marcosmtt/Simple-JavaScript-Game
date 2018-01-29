let canvas;
let ctx; //Context
let WIDTH, HEIGHT;
let frames = 0;
let character;
var velocidade = 4;

ground = {
    //This variable is used to create the game ground
    sizeY: 550,
    height: 50,
    color: "#803300",

    draw: function () { //método
        ctx.fillStyle = this.color;
        ctx.fillRect(0, this.sizeY, WIDTH, this.height);
    }

};

obstacles = {
    objs: [],
    colors: ["#2eb82e", "#e6b800", "#e65c00", "#002db3", "#b300b3"],
    insertTime: 0,

    insertObj: function () { //Create into the canvas a new obstacle with these particulars
        this.objs.push({
            x: WIDTH, //Initial obstacle position at X 
            width: 30 + Math.floor(21 * Math.random()),
            height: 30 + Math.floor(120 * Math.random()),
            color: this.colors[Math.floor(5 * Math.random())]
        })
    },

    update: function () {
        var size = this.objs.lenght;
        for (var i = 0; i < size; i++) {
            var obs = this.objs[i];
            obs.x -= velocidade;

            if (obs.x <= -obs.width) {
                this.objs.splice(i, 1);
                i--; //to fix a problem when try to access an element out of the array index
                size--;
            }
        }
    },

    draw: function () {
        for (let i = 0; i < this.objs.length; i++) {
            let obs = this.objs[i];
            ctx.fillStyle = obs.color;
            ctx.fillRect(obs.x, ground.sizeY - obs.height, obs.width, obs.height);
        }
    }
};

function initCharacter(height) {
    let characterHeight = 50;
    let characterWidth = 50;
    maxJumps = 2;

    return {
        //Set basic character parameters and functions
        x: 50,
        jumpCount: 0,
        y: height / 2 - characterHeight,
        color: "#ff4e4e",


        //Adding some physics:
        gravity: 1.2,
        speed: 1.2,
        jumpForce: 20,

        update: function () {
            this.speed += this.gravity;
            this.y += this.speed;

            if (this.y >= ground.sizeY - characterHeight) {
                this.y = ground.sizeY - characterHeight;
                this.jumpCount = 0;
            }
        },

        jump: function () {
            if (this.jumpCount < maxJumps) {
                this.speed = -this.jumpForce;
                this.jumpCount++;
            }
        },

        draw: function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, characterHeight, characterWidth);
        }
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

    character = initCharacter(HEIGHT);

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
    obstacles.update();
}

function draw() {
    ctx.fillStyle = "#66c2ff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ground.draw();
    obstacles.draw();
    character.draw();
}

//inicializa o jogo
main();

