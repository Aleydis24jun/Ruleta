var options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

var preguntas = ["¿Cómo se explican los procesos de enseñanza-aprendizaje como objeto del asesoramiento?", "¿Qué es la modalidad de intervención?", "¿Cómo se fundamenta la modalidad de intervención asistencial?", "¿Cuáles son los servicios que ofrecen información, asesoría y capacitación al personal del sistema educativo?", "¿Qué son y para qué sirven las políticas educativas?", "¿Cuáles son las modalidades de intervención?"
,"De que se encargan las unidades de servicio de apoyo a la educación regular? (USAER)", "¿Cuál es el principal aporte de Ausubel dentro del paradigma cognoscitivista?", "¿En qué consiste la teoría Bio ecológica?"];

// Initialize Variables
var inicioAngulo = 0;
var tiemoutGirar = null;
var optRuleta;
var GirarArcStart = 10;
var GirarTime = 0;
var GirarTimeTotal = 0;
var arc = Math.PI / (options.length / 2);

// Evento de girar del index principal.
document.getElementById("Girar").addEventListener("click", Girar);

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
}

// Función para RGB.
function RGB2Color(r, g, b) {
  return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

// Obtenemos los colores, determinando el RGB.
function getColor2RGB(item, maxitem) {
  var fase = 0;
  var centrar = 128;
  var width = 127;
  var frecuencia = Math.PI * 2 / maxitem;

  // R G B.
  red = Math.sin(frecuencia * item + 2 + fase) * width + centrar;
  green = Math.sin(frecuencia * item + 0 + fase) * width + centrar;
  blue = Math.sin(frecuencia * item + 4 + fase) * width + centrar;

  return RGB2Color(red, green, blue);
}

// Dibujamos la ruleta.
function dibujarRuleta() {
  // Obtenemos el canvas desde el Id Canvas.
  var canvas = document.getElementById("canvas");

  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;
    optRuleta = canvas.getContext("2d");
    optRuleta.clearRect(0, 0, 3000, 500);
    optRuleta.strokeStyle = "white";
    optRuleta.lineWidth = 2;
    optRuleta.font = '14px Verdana, Arial';
    for (var i = 0; i < options.length; i++) {
      var angle = inicioAngulo + i * arc;
      optRuleta.fillStyle = getColor2RGB(i, options.length);
      optRuleta.beginPath();
      optRuleta.arc(250, 250, outsideRadius, angle, angle + arc, false);
      optRuleta.arc(250, 250, insideRadius, angle + arc, angle, true);
      optRuleta.stroke();
      optRuleta.fill();
      optRuleta.save();
      optRuleta.shadowOffsetX = -1;
      optRuleta.shadowOffsetY = -1;
      optRuleta.shadowBlur = 0;
      optRuleta.shadowColor = "rgb(220,110,220)";
      optRuleta.fillStyle = "black";
      optRuleta.translate(250 + Math.cos(angle + arc / 2) * textRadius,
        250 + Math.sin(angle + arc / 2) * textRadius);
      optRuleta.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];
      optRuleta.fillText(text, - optRuleta.measureText(text).width / 2, 0);
      optRuleta.restore();
    }

    // Flecha, color y "movimiento".
    optRuleta.fillStyle = "black";
    optRuleta.beginPath();
    optRuleta.moveTo(250 - 4, 250 - (outsideRadius + 5));
    optRuleta.lineTo(250 + 4, 250 - (outsideRadius + 5));
    optRuleta.lineTo(250 + 4, 250 - (outsideRadius - 5));
    optRuleta.lineTo(250 + 9, 250 - (outsideRadius - 5));
    optRuleta.lineTo(250 + 0, 250 - (outsideRadius - 13));
    optRuleta.lineTo(250 - 9, 250 - (outsideRadius - 5));
    optRuleta.lineTo(250 - 4, 250 - (outsideRadius - 5));
    optRuleta.lineTo(250 - 4, 250 - (outsideRadius + 5));
    optRuleta.fill();
  }
}

function Girar() {
  GirarAngleStart = Math.random() * 10 + 10;
  GirarTime = 0;
  GirarTimeTotal = Math.random() * 3 + 4 * 1000;
  rotarRuleta();
}

// Función que realiza el giro de la ruleta.
function rotarRuleta() {
  GirarTime = GirarTime + 30;
  if (GirarTime >= GirarTimeTotal) {
    detenerRotacionRuleta();
    return;
  }
  var GirarAngle = GirarAngleStart - mathOperations(GirarTime, 0, GirarAngleStart, GirarTimeTotal);
  inicioAngulo += (GirarAngle * Math.PI / 180);
  dibujarRuleta();
  tiemoutGirar = setTimeout('rotarRuleta()', 30);
}

// Detener la ruleta.
function detenerRotacionRuleta() {
  clearTimeout(tiemoutGirar);
  var degrees = inicioAngulo * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  optRuleta.save();
  optRuleta.font = 'bold 15px Verdana, Arial';
  var text = preguntas[Math.floor((Math.random() * (8 - 0 + 1)) + 0)];
  optRuleta.fillText(text, 1 , 465 + 10);

}

function mathOperations(GirarTime, b, GirarAngleStart, GirarTimeTotal) {
  var ts = (GirarTime /= GirarTimeTotal) * GirarTime;
  var tc = ts * GirarTime;
  return b + GirarAngleStart * (tc + -3 * ts + 3 * GirarTime);
}

// Llamamos nuestra función que invocará las demás.
dibujarRuleta();
