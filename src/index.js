var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width, height = canvas.height;
var backgroundColor = "rgb(49, 49, 49)";
var numberOfSteps = parseInt(document.getElementById("numberOfSteps").value); // Initialize with input value
var scaleFactor = 10;// width / numberOfSteps;  // Initial scale factor

function clearCanvas() {
    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.closePath();
    drawAxes();
}
clearCanvas();

var sortingAlgoInput = document.getElementById("sortingAlgoInput");
var delayInput = document.getElementById("delayInput");
var numberOfStepsInput = document.getElementById("numberOfSteps");
var stepSizeInput = document.getElementById("stepSize");
var differentialEquationInput = document.getElementById("differentialEquation");
var startBtn = document.getElementById("startBtn");

var delay = parseFloat(delayInput.value);
var stepSize = parseFloat(stepSizeInput.value);
var running = false;

numberOfStepsInput.onchange = e => {
    let n = parseInt(e.target.value);
    if (n != null && numberOfSteps != n) {
        numberOfSteps = n;
        scaleFactor = 10;//width / numberOfSteps;  // Update scale factor
        clearCanvas();
    }
}

stepSizeInput.onchange = e => {
    let h = parseFloat(e.target.value);
    if (h != null && stepSize != h) {
        stepSize = h;
    }
}

delayInput.onchange = e => {
    let d = parseFloat(e.target.value);
    if (d != null && delay != d) {
        delay = d;
    }
}

startBtn.onclick = () => {
    running = !running;
    if (running) {
        startBtn.textContent = "Stop";
        startBtn.style.backgroundColor = "darkred";
        switch (sortingAlgoInput.value) {
            case "Euler Method":
                console.log("Starting Euler Method");
                const equationString = differentialEquationInput.value;
                const differentialEquation = parseEquation(equationString);
                eulerMethod(differentialEquation, 0, 1);  // Provide initial x0 and y0 values
                break;
            default:
                console.log("Woopsie :(");
                break;
        }
    } else {
        stopRunning();
    }
}

function stopRunning() {
    console.log("stopping");
    startBtn.textContent = "Start";
    startBtn.style.backgroundColor = "darkgreen";
    running = false;
}

function drawPoint(x, y) {
    console.log(`Drawing point at (${x}, ${y})`);
    ctx.fillStyle = "white";
    ctx.fillRect(x * scaleFactor,  y * scaleFactor, 2, 2);  // Adjust scaling as necessary
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1 * scaleFactor,  y1 * scaleFactor);
    ctx.lineTo(x2 * scaleFactor,y2 * scaleFactor);
    ctx.strokeStyle = "white";
    ctx.stroke();
}

function drawAxes() {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    // X-axis
    ctx.moveTo(0, height);
    ctx.lineTo(width, height);
    // Y-axis
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    ctx.stroke();
    ctx.closePath();
}

function drawGraph() {
    console.log('Graph updated');
}

async function sleep() {
    if (delay == 0) return;
    return new Promise(resolve => {
        setTimeout(() => resolve(2), delay);
    });
}

function parseEquation(equationString) {
    const compiledEquation = math.compile(equationString);
    return (x, y) => compiledEquation.evaluate({ x, y });
}
