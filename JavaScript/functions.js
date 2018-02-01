let canvas;
let ctx; //Context
let WIDTH, HEIGHT;
let frames = 0;
let character;
const objSpeed = 5;
let gameState;

const states = {
    play: 0,
    playing: 1,
    gameOver: 2
};

//===========  OBJECTS ============

const ground = {
    //This variable is used to create the game ground
    sizeY: 550,
    height: 50,
    color: "#803300",

    render: function () { //método
        ctx.fillStyle = this.color;
        ctx.fillRect(0, this.sizeY, WIDTH, this.height);
    }

};

const obstacles = {
    objs: [],
    colors: ["#2eb82e", "#e6b800", "#e65c00", "#002db3", "#b300b3"],
    insertTime: 0,

    insertObj: function () { //Create into the canvas a new obstacle with these particulars
        this.objs.push({
            x: WIDTH, //Initial obstacle position at X 
            obsWidth: 30 + Math.floor(21 * Math.random()),
            obsHeight: 30 + Math.floor(100 * Math.random()),
            color: this.colors[Math.floor(5 * Math.random())]
        });

        this.insertTime = 5 + Math.floor(80 * Math.random());
    },

    update: function () {
        if (this.insertTime == 0)
            this.insertObj();
        else
            this.insertTime--;

        let size = this.objs.length;
        for (let i = 0; i < size; i++) {
            let obs = this.objs[i];
            let height = parseInt(obs.obsHeight); //Temporary solution to solve a problem

            obs.x -= objSpeed;

            if (character.x < obs.x + obs.obsWidth && character.x + character.charWidth >= obs.x
                && character.y + character.charHeight >= ground.sizeY - height)
                gameState = states.gameOver; //Lembrete: - Pegar os atributos do character para verificar a colisão
            else if (obs.x <= -obs.obsWidth) {
                this.objs.splice(i, 1);
                i--;
                size--;
            }
        }
    },

    clean: function () {
        this.objs = [];
    },

    render: function () {
        for (let i = 0; i < this.objs.length; i++) {
            let obs = this.objs[i];
            ctx.fillStyle = obs.color;
            ctx.fillRect(obs.x, ground.sizeY - obs.obsHeight, obs.obsWidth, obs.obsHeight);
        }
    }
};

function initCharacter(height) {
    const characterHeight = 50;
    const characterWidth = 50;
    const maxJumps = 2;

    return {
        //Set basic character parameters and functions
        charWidth: characterWidth,
        charHeight: characterHeight,
        x: 50, //Initial position in X axis
        jumpCount: 0,
        y: height / 2 - characterHeight, //Position in Y axis
        characterColor: "#ff4e4e",
        //Adding some physics:
        gravity: 1.5,
        speed: 1.4,
        jumpForce: 25,

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

        render: function () {
            ctx.fillStyle = this.characterColor;
            ctx.fillRect(this.x, this.y, characterHeight, characterWidth);
        }
    }
};

//=============  GAME FUNCTIONS ===================

function click(event) {

    if (gameState == states.playing)
        character.jump();
    else if (gameState == states.play)
        gameState = states.playing;
    else if (gameState == states.gameOver)
        gameState = states.play;

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

    gameState = states.play;
    run();
}

function run() {
    update();
    render();

    window.requestAnimationFrame(run);
}

function update() {
    frames++;
    character.update();

    if (gameState == states.playing) {
        obstacles.update();
    } else if (gameState == states.gameOver) {
        obstacles.clean();
    }

}

function render() {
    ctx.fillStyle = "#66c2ff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ground.render();
    character.render();

    if (gameState == states.play) {
        ctx.fillStyle = "green";
        ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100);
    } else if (gameState == states.playing) {
        obstacles.render();
    } else if (gameState == states.gameOver) {
        ctx.fillStyle = "red";
        ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100);
    }
}

//Start the game
main();

