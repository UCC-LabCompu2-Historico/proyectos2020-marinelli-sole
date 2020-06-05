
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

function pasarFormulario(){
    var nombre,dino,urlComp;
    nombre = document.getElementById("nombre").value;
    dino = document.getElementsByName("dino")[obtenerRadioButton()].value;
    urlComp = "PantallaJuego.html#" + nombre + "#" + dino;
    window.open(urlComp);
}

function obtenerRadioButton()
{
    var dino = document.getElementsByName("dino");
    for(i=0;i<3;i++)
        if(dino[i].checked) return i;
}

function obtenerFormulario() {
    var urlComp, nombre, dino;

    urlComp = window.location.href.split('/')[4];
    nombre= window.location.href.split('#')[1];
    dino= window.location.href.split('#')[2];

    document.getElementById("nombre_jugador").innerHTML = nombre;
}

function obtenerNombre() {
    var urlComp, nombre;

    urlComp = window.location.href.split('/')[4];
    nombre= window.location.href.split('#')[1];
    return nombre;
}

function obtenerDino() {
    var urlComp, dino;

    urlComp = window.location.href.split('/')[4];
    dino= window.location.href.split('#')[2];
    return dino;
}
var x=0,y=0;
function animarInicio() {
    var canvas = document.getElementById("juego");
    var ctx = canvas.getContext("2d");
    canvas.width=canvas.width;
    ctx.fillStyle = "White";
    ctx.font = "bold 50px sans-serif";
    ctx.fillText("El Dinosaurio Cordobes",300,350);
}
