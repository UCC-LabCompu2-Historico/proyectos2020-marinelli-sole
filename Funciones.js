
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

    ctx.beginPath();
    numero1.onload = function(){
        ctx.drawImage(numero1,30,30,50,50);
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

}