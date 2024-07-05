var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width, height = canvas.height;
var backgroundColor = "rgb(49, 49, 49)";

function clearCanvas() {
    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.closePath();
}
clearCanvas();

var sortingAlgoInput = document.getElementById("sortingAlgoInput");
var delayInput = document.getElementById("delayInput");
var numberOfStepsInput = document.getElementById("numberOfSteps");
var stepSizeInput = document.getElementById("stepSize");
var startBtn = document.getElementById("startBtn");

var delay = parseFloat(delayInput.value);
var numberOfSteps = parseInt(numberOfStepsInput.value);
var stepSize = parseFloat(stepSizeInput.value);
var running = false;

numberOfStepsInput.onchange = e => {
    let n = parseInt(e.target.value);
    if (n != null && numberOfSteps != n) {
        numberOfSteps = n;
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
    ctx.fillStyle = "white";
    ctx.fillRect(x * 10, height - y * 10, 2, 2);  // Adjust scaling as necessary
}

function drawGraph() {
    console.log('Graph updated');
}
