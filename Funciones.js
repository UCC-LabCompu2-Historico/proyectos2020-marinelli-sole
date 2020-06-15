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
    var nombre,dino,urlComp;
    nombre = document.getElementById("nombre").value;
    dino = document.getElementsByName("dino")[obtenerRadioButton()].value;
    urlComp = "PantallaJuego.html#" + nombre + "#" + dino;
    window.open(urlComp);
}

/**
 * A partir de esta funcion se logra saber que dinosaurio fue seleccionado para jugar.
 * @method obtenerRadioButton
 * @return {number} - Devuelve la posicion del arreglo de radio buttons que fue seleccionado
 */
function obtenerRadioButton()
{
    var dino = document.getElementsByName("dino");
    for(i=0;i<3;i++)
        if(dino[i].checked) return i;
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

/**
 * Esta funcion realiza la animacion de la pagina del video juego.
 * @method animarInicio
 */
function animarInicio() {
    var canvas = document.getElementById("juego");
    var ctx = canvas.getContext("2d");
    canvas.width=canvas.width;
    setInterval(moverTitulo,30);
    setInterval(moverFernet,1);
}

x=0;
y=0;
dx=1;

/**
 * Esta funcion realiza la animacion del titulo.
 * @method moverTitulo
 */
function moverTitulo() {
    var canvas = document.getElementById("juego");
    var ctx = canvas.getContext("2d");
    canvas.width=canvas.width;
    ctx.fillStyle = "black";
    ctx.font = "bold 50px sans-serif";
    ctx.fillText("El Dinosaurio Cordobes",x,y);
    x+=dx;
    y+=dx;
    if(x>1300) x=0;
    if(y>700) y=0;
}

x1=1600;
x2=2000;
x3=2500;

/**
 * Esta funcion realiza la animacion del fernet.
 * @method moverFernet
 */
function moverFernet() {
    var canvas = document.getElementById("juego");
    var ctx = canvas.getContext("2d");
    
    var img = new Image();
    img.src = "imagenes/fernet.png";
    img.onload = function(){
        ctx.drawImage(img,x1,550, 60,80);
        ctx.drawImage(img,x2,550, 60,80);
        ctx.drawImage(img,x3,550, 60,80);
    }
    x1-=dx;
    x2-=dx;
    x3-=dx;
    if(x1<0) x1=1600;
    if(x2<0) x2=2000;
    if(x3<0) x3=2500;
}

