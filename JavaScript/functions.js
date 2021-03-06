let canvas;
let ctx; //Context
let WIDTH, HEIGHT;
let frames = 0;
let character;
const objSpeed = 7;
let gameState;
let record;

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
            obsWidth: 40,
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
            let height = parseInt(obs.obsHeight);

            obs.x -= objSpeed;

            if (obs.x == 0)
                character.score++;

            if (character.x < obs.x + obs.obsWidth && character.x + character.charWidth >= obs.x
                && character.y + character.charHeight >= ground.sizeY - height)
                gameState = states.gameOver;

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
        score: 0,
        record: 0,

        gravity: 1.5,
        speed: 1.4,
        jumpForce: 27,

        update: function () {
            this.speed += this.gravity;
            this.y += this.speed;

            if (this.y >= ground.sizeY - characterHeight && gameState != states.gameOver) {
                this.y = ground.sizeY - characterHeight;
                this.jumpCount = 0;
                this.speed = 0;
            }
        },

        reset: function () {
            this.speed = 0;
            this.y = height / 2 - characterHeight;

            if (this.score > record) {
                localStorage.setItem("record", this.score);
                record = this.score;
            }

            this.score = 0;
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
    else if (gameState == states.gameOver && character.y >= 2 * HEIGHT) { //This 2nd condition creates a delay to restart the game
        obstacles.clean();
        gameState = states.play;
        character.reset();
    }

}

function main() {
    WIDTH = window.innerWidth; //Largura
    HEIGHT = window.innerHeight;//Altura

    if (HEIGHT > 500) {
        WIDTH = 700;
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

    record = localStorage.getItem("record");

    if (record == null)
        record = 0;

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

    if (gameState == states.playing)
        obstacles.update();
}

function render() {
    ctx.fillStyle = "#66c2ff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ground.render();
    character.render();

    ctx.fillStyle = "#fff";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + character.score, 10, 35);

    ctx.font = "50px Arial";
    if (gameState == states.play) {
        ctx.fillStyle = "green";
        ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100);
    } else if (gameState == states.playing) {
        obstacles.render();
    } else if (gameState == states.gameOver) {
        ctx.fillStyle = "red";
        ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100);

        ctx.save();
        ctx.translate(WIDTH / 2, HEIGHT / 2);

        if (character.score > record) {
            ctx.fillStyle = "#fff";
            ctx.fillText("Novo Recorde!", -150, -65);
        } else {
            ctx.fillStyle = "#fff";
            ctx.font = "50px Arial";
            ctx.fillText("Recorde: " + record, -ctx.measureText("Recorde: " + record).width / 2, -65);
            ctx.fillText(character.score, -ctx.measureText(character.score).width / 2, 19);
        }

        ctx.restore();
    }
}

//Start the game
main();

