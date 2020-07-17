/**
 * La funcion realiza un canvas en el que se grafica el progreso que se tiene durante el juego.
 * @method dibujarMapaProgreso
 */
function dibujarMapaProgreso(){
    var canvas = document.getElementById("canvas_progreso");
    var ctx = canvas.getContext("2d");

    canvas.width = canvas.width;

    var numero1 = new Image();
    numero1.src = "imagenes/number-one-inside-a-circle.png";
    var numero2 = new Image();
    numero2.src = "imagenes/number-2.png";
    var numero3 = new Image();
    numero3.src = "imagenes/numbre-3.png";
    var trofeo = new Image();
    trofeo.src = "imagenes/trophy.png";
    var dino = new Image();
    if(obtenerDino()=="dino_rosa") dino.src = "imagenes/dinoRosa.png";
    if(obtenerDino()=="dino_amarillo") dino.src = "imagenes/dinoAmarillo.png"
    if(obtenerDino()=="dino_verde") dino.src = "imagenes/dinoVerde.png"

    ctx.beginPath();
    numero1.onload = function(){
        ctx.drawImage(numero1,30,30,50,50);
    }
    dino.onload = function(){
        ctx.drawImage(dino,30,65,70,70);
    }
    numero2.onload = function(){
        ctx.drawImage(numero2,200,120,50,50);
    }
    numero3.onload = function(){
        ctx.drawImage(numero3,330,30,50,50);
    }
    trofeo.onload = function(){
        ctx.drawImage(trofeo,530,90,50,50);
    }
    ctx.closePath();

    ctx.beginPath()
    ctx.lineWidth = 15;

    ctx.beginPath();
    ctx.moveTo(80, 70);
    ctx.lineTo(200, 140);
    ctx.stroke();
    ctx.moveTo(250, 140);
    ctx.lineTo(330, 70);
    ctx.stroke();
    ctx.moveTo(370, 70);
    ctx.lineTo(530, 120);
    ctx.stroke();
    ctx.closePath();
}

/**
 * Se envia el formulario obtenido para utilizar la informacion (nombre del jugador, dinosaurio seleccionado y ).
 * @method pasarFormulario
 */
function pasarFormulario(){
    var nombre,dino,urlComp,pasar;
    nombre = document.getElementById("nombre").value;
    pasar=1;
    if(obtenerRadioButton()==undefined){
        alert("Seleccione un dinosaurio");
        pasar=0
    }
    else{
    dino = document.getElementsByName("dino")[obtenerRadioButton()].value;
    }

    if(nombre==""){
        alert("Ingrese un nombre valido");
        pasar=0;
    }
    if(nombre.length>20){
        alert("Nombre demasiado grande");
        pasar=0;
    }
    if(pasar==1) {
        urlComp = "PantallaJuego.html#" + nombre + "#" + dino;
        window.open(urlComp, "_self");
    }

}

/**
 * A partir de esta funcion se logra saber que radio button fue seleccionado.
 * @method obtenerRadioButton
 * @return {number} - Devuelve la posicion del arreglo de radio buttons que fue seleccionado
 */
function obtenerRadioButton()
{
    var dino = document.getElementsByName("dino");
    var contador;
    for(i=0;i<3;i++){
        if (dino[i].checked) return i;
    }
}

/**
 * Esta funcion sirve para obtener la informacion pasada a travez de la url
 * @method obtenerFormulario
 */
function obtenerFormulario() {
    var urlComp, nombre, dino;

    urlComp = window.location.href.split('/')[4];
    nombre= window.location.href.split('#')[1];
    dino= window.location.href.split('#')[2];

    document.getElementById("nombre_jugador").innerHTML = nombre;
}

/**
 * Se obtiene el nombre del jugador.
 * @method obtenerNombre
 * @return {string} nombre - devuelve el nombre del jugador
 */
function obtenerNombre() {
    var urlComp, nombre;

    urlComp = window.location.href.split('/')[4];
    nombre= window.location.href.split('#')[1];
    return nombre;
}

/**
 * Se obtiene la imagen del dinosaurio seleccionado.
 * @method obtenerDino
 * @return {string} dino - se retorna el dinosaurio que fue seleccionado
 */
function obtenerDino() {
    var urlComp, dino;

    urlComp = window.location.href.split('/')[4];
    dino= window.location.href.split('#')[2];
    return dino;
}

const canvas = document.getElementById("juego");
const ctx = canvas.getContext("2d");

// Variables
let score;
let scoreText;
let highscore;
let highscoreText;
let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};
var dino = new Image();
if(obtenerDino()=="dino_rosa") dino.src = "imagenes/dinoRosa.png";
if(obtenerDino()=="dino_amarillo") dino.src = "imagenes/dinoAmarillo.png"
if(obtenerDino()=="dino_verde") dino.src = "imagenes/dinoVerde.png"
const fernet = new Image();
fernet.src = "imagenes/fernet.png";

// Event Listeners
document.addEventListener('keydown', function (evt) {
    keys[evt.code] = true;
});
document.addEventListener('keyup', function (evt) {
    keys[evt.code] = false;
});

class Player {
    constructor (x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;

        this.dy = 0;
        this.jumpForce = 15;
        this.originalHeight = h;
        this.grounded = false;
        this.jumpTimer = 0;
    }

    Animate () {
        // Jump
        if (keys['Space'] || keys['KeyW']) {
            this.Jump();
        } else {
            this.jumpTimer = 0;
        }

        if (keys['ShiftLeft'] || keys['KeyS']) {
            this.h = this.originalHeight / 2;
        } else {
            this.h = this.originalHeight;
        }

        this.y += this.dy;

        // Gravity
        if (this.y + this.h < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }

        this.Draw();
    }

    Jump () {
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.dy = -this.jumpForce - (this.jumpTimer / 50);
        }
    }

    Draw () {
        ctx.beginPath();
        /*ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);*/
        ctx.drawImage(dino,this.x-20,this.y,this.w+50,this.h);
        ctx.closePath();
    }
}

class Obstacle {
    constructor (x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;

        this.dx = -gameSpeed;
    }

    Update () {
        this.x += this.dx;
        this.Draw();
        this.dx = -gameSpeed;
    }

    Draw () {
        ctx.beginPath();
        /*ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);*/
        ctx.drawImage(fernet,this.x-18,this.y,this.w+30,this.h);
        ctx.closePath();
    }
}

class Text {
    constructor (t, x, y, a, c, s) {
        this.t = t;
        this.x = x;
        this.y = y;
        this.a = a;
        this.c = c;
        this.s = s;
    }

    Draw () {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.font = this.s + "px sans-serif";
        ctx.textAlign = this.a;
        ctx.fillText(this.t, this.x, this.y);
        ctx.closePath();
    }
}

// Game Functions
function SpawnObstacle () {
    let size = RandomIntInRange(70, 100);
    let type = RandomIntInRange(0, 1);
    let obstacle = new Obstacle(canvas.width + size, canvas.height - size, size-50, size, 'white');

    if (type == 1) {
        obstacle.y -= player.originalHeight - 10;
    }
    obstacles.push(obstacle);
}


function RandomIntInRange (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function Start () {
    canvas.width = canvas.width;
    canvas.height = canvas.height;

    ctx.font = "20px sans-serif";

    gameSpeed = 3;
    gravity = 1;

    score = 0;
    highscore = 0;
    if (localStorage.getItem('highscore')) {
        highscore = localStorage.getItem('highscore');
    }

    player = new Player(25, 0, 50, 150, 'white');

    scoreText = new Text("Score: " + score, 25, 25, "left", "#212121", "20");
    highscoreText = new Text("Highscore: " + highscore, canvas.width - 25, 25, "right", "#212121", "20");

    requestAnimationFrame(Update);
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;
function Update () {
    requestAnimationFrame(Update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spawnTimer--;
    if (spawnTimer <= 0) {
        SpawnObstacle();
        console.log(obstacles);
        spawnTimer = initialSpawnTimer - gameSpeed * 8;

        if (spawnTimer < 60) {
            spawnTimer = 60;
        }
    }

    // Spawn Enemies
    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i];

        if (o.x + o.w < 0) {
            obstacles.splice(i, 1);
        }

        if (
            player.x < o.x + o.w &&
            player.x + player.w > o.x &&
            player.y < o.y + o.h &&
            player.y + player.h > o.y
        ) {
            obstacles = [];
            score = 0;
            spawnTimer = initialSpawnTimer;
            gameSpeed = 3;
            window.localStorage.setItem('highscore', highscore);
        }

        o.Update();
    }

    player.Animate();

    score++;
    scoreText.t = "Score: " + score;
    scoreText.Draw();

    if (score > highscore) {
        highscore = score;
        highscoreText.t = "Highscore: " + highscore;
    }

    highscoreText.Draw();

    gameSpeed += 0.003;
}

Start();

var aux1=score;
function ObtenerPuntuaciones() {
    document.getElementById("puntuos").innerHTML = score;
    document.getElementById("puesto1").innerHTML = highscore;
}

function ActualizarPuntos() {
    setInterval(ObtenerPuntuaciones,100)
}